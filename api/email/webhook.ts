import * as admin from 'firebase-admin';
import { Webhook } from 'svix';
import { Resend } from 'resend';
import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IncomingMessage } from 'http';

// ── Firebase Admin (singleton) ───────────────────────────────
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

// ── Clients ──────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Constants ────────────────────────────────────────────────
const ALLOWED_SENDER = 'alen@zendtpayments.com';
const CONFIRMATION_TO = 'alen@zendtpayments.com';
const FROM_EMAIL = 'marketing@zendtpayments.com';
const SITE_URL = 'https://zendtpayments.com';

// ── Disable Vercel's automatic body parsing ──────────────────
// Signature verification requires the raw, unmodified body string.
export const config = {
  api: {
    bodyParser: false,
  },
};

// ── Helper: read raw body from stream ────────────────────────
function getRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

// ── Helper: extract plain email address from "Name <email>" ──
function extractEmail(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return match ? match[1].toLowerCase() : from.toLowerCase().trim();
}

// ── Helper: strip email reply quoted text ────────────────────
function stripQuotedReply(text: string): string {
  // Remove common reply markers and everything after them
  const markers = [
    /^On .+ wrote:$/m,           // "On Mon, Apr 7, 2026 ... wrote:"
    /^-{2,}\s*Original Message/m, // "-- Original Message"
    /^>{1,}\s/m,                  // "> quoted text"
    /^From:\s/m,                  // "From: sender"
  ];

  let cleaned = text;
  for (const marker of markers) {
    const idx = cleaned.search(marker);
    if (idx > 0) {
      cleaned = cleaned.substring(0, idx);
    }
  }

  return cleaned.trim();
}

// ── Helper: fetch the latest draft blog post ─────────────────
async function getLatestDraft(): Promise<{
  id: string;
  source: 'blog_drafts' | 'blog_posts';
  data: Record<string, any>;
} | null> {
  // 1. Check blog_drafts collection first
  try {
    const draftsSnap = await db
      .collection('blog_drafts')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .get();

    if (!draftsSnap.empty) {
      const doc = draftsSnap.docs[0];
      return { id: doc.id, source: 'blog_drafts', data: doc.data() };
    }
  } catch (err) {
    // Collection may not exist yet — that's fine, fall through
    console.log('blog_drafts collection not found, checking blog_posts...');
  }

  // 2. Fallback: unpublished blog_posts
  const postsSnap = await db
    .collection('blog_posts')
    .where('published', '==', false)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  if (!postsSnap.empty) {
    const doc = postsSnap.docs[0];
    return { id: doc.id, source: 'blog_posts', data: doc.data() };
  }

  return null;
}

// ── Helper: apply edits using Claude ─────────────────────────
async function applyEditsWithClaude(
  draft: Record<string, any>,
  editInstructions: string
): Promise<Record<string, any>> {
  const prompt = `You are an expert blog editor for Zendt, a fintech company for freelancers.

Below is a blog post draft in markdown. The author has replied with edit instructions.
Apply the requested edits to the post and return the COMPLETE updated post.

IMPORTANT RULES:
- Return ONLY the updated markdown content, nothing else
- Preserve the overall structure and formatting
- Apply the edits as faithfully as possible
- If an edit is unclear, use your best judgment to improve the post
- Do NOT add any commentary or explanations before/after the content

---
CURRENT DRAFT TITLE: ${draft.title}

CURRENT DRAFT CONTENT:
${draft.content}

---
EDIT INSTRUCTIONS FROM AUTHOR:
${editInstructions}`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return {
    ...draft,
    content: textBlock?.text ?? draft.content,
    updatedAt: new Date().toISOString(),
  };
}

// ── Helper: publish the blog post ────────────────────────────
async function publishPost(postData: Record<string, any>): Promise<{
  success: boolean;
  url?: string;
  id?: string;
  error?: string;
}> {
  const apiKey = process.env.BLOG_API_KEY;
  if (!apiKey) {
    throw new Error('BLOG_API_KEY is not configured');
  }

  const now = new Date().toISOString();
  const payload = {
    title: postData.title,
    slug: postData.slug,
    content: postData.content,
    metaDescription: postData.metaDescription,
    coverImageDescription: postData.coverImageDescription || null,
    author: postData.author || 'Zendt Team',
    tags: postData.tags || [],
    publishDate: now,
  };

  // Check if slug already exists — if so, update instead of insert
  const existing = await db
    .collection('blog_posts')
    .where('slug', '==', payload.slug)
    .limit(1)
    .get();

  if (!existing.empty) {
    // Update existing post (upsert)
    const docId = existing.docs[0].id;
    await db.collection('blog_posts').doc(docId).update({
      ...payload,
      published: true,
      updatedAt: now,
    });

    return {
      success: true,
      url: `${SITE_URL}/blog/${payload.slug}`,
      id: docId,
    };
  }

  // Create new post via internal publish endpoint logic
  const docRef = await db.collection('blog_posts').add({
    ...payload,
    published: true,
    createdAt: now,
    updatedAt: now,
  });

  return {
    success: true,
    url: `${SITE_URL}/blog/${payload.slug}`,
    id: docRef.id,
  };
}

// ── Helper: send confirmation email ──────────────────────────
async function sendConfirmation(title: string, url: string): Promise<void> {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: CONFIRMATION_TO,
    subject: 'Blog Published ✓',
    text: `${title} is now live at ${url}`,
    html: `<p><strong>${title}</strong> is now live at <a href="${url}">${url}</a></p>`,
  });
}

// ── Helper: clean up draft after publishing ──────────────────
async function deleteDraft(
  id: string,
  source: 'blog_drafts' | 'blog_posts'
): Promise<void> {
  if (source === 'blog_drafts') {
    await db.collection('blog_drafts').doc(id).delete();
  }
  // If source is blog_posts, it's already been updated to published: true
}

// ── Main handler ─────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── 1. Read raw body for signature verification ────────────
  let rawBody: string;
  try {
    rawBody = await getRawBody(req);
  } catch (err) {
    console.error('Failed to read request body:', err);
    return res.status(400).json({ error: 'Failed to read request body' });
  }

  // ── 2. Verify webhook signature ────────────────────────────
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('RESEND_WEBHOOK_SECRET is not configured');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  const svixId = req.headers['svix-id'] as string;
  const svixTimestamp = req.headers['svix-timestamp'] as string;
  const svixSignature = req.headers['svix-signature'] as string;

  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ error: 'Missing webhook signature headers' });
  }

  let event: any;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(rawBody, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid webhook signature' });
  }

  // ── 3. Only process email.received events ──────────────────
  if (event.type !== 'email.received') {
    return res.status(200).json({ message: `Ignored event: ${event.type}` });
  }

  const { email_id, from, subject } = event.data;
  console.log(`Received email from: ${from}, subject: ${subject}`);

  // ── 4. Validate sender ────────────────────────────────────
  const senderEmail = extractEmail(from);
  if (senderEmail !== ALLOWED_SENDER) {
    console.log(`Ignoring email from unauthorized sender: ${senderEmail}`);
    return res.status(200).json({ message: 'Unauthorized sender, ignored' });
  }

  // ── 5. Fetch full email body via Resend Receiving API ──────
  let emailBody: string;
  try {
    const { data: receivedEmail, error } = await resend.emails.get(email_id);

    if (error || !receivedEmail) {
      console.error('Failed to fetch received email:', error);
      return res.status(500).json({ error: 'Failed to fetch email content' });
    }

    // Use text body; fall back to stripping HTML if needed
    emailBody = (receivedEmail as any).text || (receivedEmail as any).body || '';
  } catch (err) {
    console.error('Error fetching email:', err);
    return res.status(500).json({ error: 'Failed to fetch email content' });
  }

  // Strip quoted reply text to get just the new reply content
  const replyText = stripQuotedReply(emailBody);

  if (!replyText) {
    console.log('Empty reply body, ignoring');
    return res.status(200).json({ message: 'Empty reply, ignored' });
  }

  console.log(`Reply text: "${replyText.substring(0, 100)}..."`);

  // ── 6. Fetch the latest draft ──────────────────────────────
  const draft = await getLatestDraft();

  if (!draft) {
    console.error('No draft blog post found');
    // Notify via email that no draft was found
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONFIRMATION_TO,
      subject: 'Blog Publish Failed ✗',
      text: 'No draft blog post was found to publish. Please ensure a draft exists in Firestore.',
    });
    return res.status(404).json({ error: 'No draft blog post found' });
  }

  console.log(`Found draft: "${draft.data.title}" from ${draft.source}`);

  // ── 7. Process: approve or edit ────────────────────────────
  const isApproval = /\bAPPROVE\b/i.test(replyText);
  let postToPublish = draft.data;

  if (!isApproval) {
    console.log('Applying edit suggestions via Claude...');
    try {
      postToPublish = await applyEditsWithClaude(draft.data, replyText);
      console.log('Edits applied successfully');
    } catch (err) {
      console.error('Claude edit failed:', err);
      await resend.emails.send({
        from: FROM_EMAIL,
        to: CONFIRMATION_TO,
        subject: 'Blog Publish Failed ✗',
        text: `Failed to apply edits to "${draft.data.title}". Error: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`,
      });
      return res.status(500).json({ error: 'Failed to apply edits' });
    }
  } else {
    console.log('Approval received — publishing as-is');
  }

  // ── 8. Publish the post ────────────────────────────────────
  let result;
  try {
    result = await publishPost(postToPublish);
  } catch (err) {
    console.error('Publish failed:', err);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: CONFIRMATION_TO,
      subject: 'Blog Publish Failed ✗',
      text: `Failed to publish "${draft.data.title}". Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
    });
    return res.status(500).json({ error: 'Failed to publish post' });
  }

  // ── 9. Send confirmation email ─────────────────────────────
  try {
    await sendConfirmation(postToPublish.title, result.url!);
    console.log('Confirmation email sent');
  } catch (err) {
    console.error('Failed to send confirmation email:', err);
    // Don't fail the whole request — the post is already published
  }

  // ── 10. Clean up the draft ─────────────────────────────────
  try {
    await deleteDraft(draft.id, draft.source);
    console.log('Draft cleaned up');
  } catch (err) {
    console.error('Failed to delete draft:', err);
    // Non-critical — don't fail
  }

  return res.status(200).json({
    success: true,
    message: isApproval ? 'Post approved and published' : 'Edits applied and post published',
    url: result.url,
    postId: result.id,
  });
}
