import * as admin from 'firebase-admin';
import { Webhook } from 'svix';
import { Resend } from 'resend';
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
const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = 'https://zendtpayments.com';
const ALEN_EMAIL = 'alen@zendtpayments.com';
const FROM_EMAIL = 'marketing@zendtpayments.com';

// ── Disable Vercel body parsing (required for svix signature verification)
export const config = {
  api: { bodyParser: false },
};

// ── Read raw body from stream ────────────────────────────────
function getRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

// ── Extract plain email from "Name <email>" format ───────────
function extractEmail(from: string): string {
  const match = from.match(/<([^>]+)>/);
  return match ? match[1].toLowerCase() : from.toLowerCase().trim();
}

// ── Strip quoted reply text to get just the new reply ────────
function stripQuotedReply(text: string): string {
  const markers = [
    /^On .+ wrote:$/m,
    /^-{2,}\s*Original Message/m,
    /^>{1,}\s/m,
    /^From:\s/m,
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

// ── Main handler ─────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Read raw body
  let rawBody: string;
  try {
    rawBody = await getRawBody(req);
  } catch {
    return res.status(400).json({ error: 'Failed to read request body' });
  }

  // 2. Verify webhook signature via Svix
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('RESEND_WEBHOOK_SECRET not configured');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  const svixId = req.headers['svix-id'] as string;
  const svixTimestamp = req.headers['svix-timestamp'] as string;
  const svixSignature = req.headers['svix-signature'] as string;

  if (!svixId || !svixTimestamp || !svixSignature) {
    return res.status(400).json({ error: 'Missing signature headers' });
  }

  let event: any;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(rawBody, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    });
  } catch {
    console.error('Webhook signature verification failed');
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // 3. Only handle inbound email events
  if (event.type !== 'email.received') {
    return res.status(200).json({ message: `Ignored event: ${event.type}` });
  }

  const { from, subject, text, html } = event.data;
  console.log(`Email from: ${from}, subject: ${subject}`);

  // 4. Validate sender is Alen
  const senderEmail = extractEmail(from);
  if (senderEmail !== ALEN_EMAIL) {
    console.log(`Unauthorized sender: ${senderEmail}`);
    return res.status(200).json({ message: 'Unauthorized sender, ignored' });
  }

  // 5. Extract reply text — Resend inbound gives us text/html in event.data directly
  const emailBody = text || '';
  const replyText = stripQuotedReply(emailBody).toUpperCase();

  if (!replyText) {
    console.log('Empty reply, ignoring');
    return res.status(200).json({ message: 'Empty reply, ignored' });
  }

  console.log(`Reply text: "${replyText.substring(0, 100)}"`);

  // 6. Check for APPROVE
  if (!replyText.includes('APPROVE')) {
    console.log('Reply does not contain APPROVE, ignoring');
    return res.status(200).json({ message: 'No APPROVE found, ignored' });
  }

  // 7. Get the latest unpublished blog post from Firestore
  const snap = await db
    .collection('blog_posts')
    .where('published', '==', false)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  if (snap.empty) {
    console.error('No unpublished blog post found');
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ALEN_EMAIL,
      subject: '❌ Blog Publish Failed',
      html: '<p>No unpublished blog post found in Firestore. Nothing to publish.</p>',
    });
    return res.status(404).json({ error: 'No unpublished post found' });
  }

  const doc = snap.docs[0];
  const post = doc.data();
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  console.log(`Publishing: "${post.title}" (${doc.id})`);

  // 8. Set published: true
  try {
    await db.collection('blog_posts').doc(doc.id).update({
      published: true,
      publishDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Firestore update failed:', err);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ALEN_EMAIL,
      subject: '❌ Blog Publish Failed',
      html: `<p>Failed to publish "<strong>${post.title}</strong>". Firestore update error.</p>`,
    });
    return res.status(500).json({ error: 'Failed to update Firestore' });
  }

  // 9. Send confirmation email
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ALEN_EMAIL,
      subject: `✅ Blog Published: ${post.title}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px;">
          <h2 style="color: #1e293b; margin-bottom: 8px;">Blog Published ✅</h2>
          <p style="color: #64748b; font-size: 16px; line-height: 1.6;">
            <strong>${post.title}</strong> is now live.
          </p>
          <a href="${postUrl}" style="display: inline-block; margin-top: 12px; padding: 10px 20px; background: #7c3aed; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
            View Post →
          </a>
          <p style="color: #94a3b8; font-size: 13px; margin-top: 20px;">
            Published at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      `,
    });
    console.log('Confirmation email sent');
  } catch (err) {
    console.error('Confirmation email failed:', err);
    // Non-critical — post is already published
  }

  return res.status(200).json({
    success: true,
    message: 'Blog post published',
    title: post.title,
    url: postUrl,
  });
}
