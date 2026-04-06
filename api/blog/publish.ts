import * as admin from 'firebase-admin';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Firebase Admin (singleton)
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // ── Auth ────────────────────────────────────────────────────
  const apiKey = process.env.BLOG_API_KEY;
  const authHeader = req.headers['x-api-key'] || req.headers.authorization?.replace('Bearer ', '');

  if (!apiKey || authHeader !== apiKey) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  // ── Validate body ──────────────────────────────────────────
  const { title, slug, content, metaDescription, publishDate, coverImageDescription, author, tags } = req.body;

  if (!title || !slug || !content || !metaDescription) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      required: ['title', 'slug', 'content', 'metaDescription'],
    });
  }

  // Validate slug format
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid slug format. Use lowercase letters, numbers, and hyphens only.',
    });
  }

  // ── Check for duplicate slug ───────────────────────────────
  const existing = await db
    .collection('blog_posts')
    .where('slug', '==', slug)
    .limit(1)
    .get();

  if (!existing.empty) {
    return res.status(409).json({
      success: false,
      error: `A post with slug "${slug}" already exists.`,
    });
  }

  // ── Insert ─────────────────────────────────────────────────
  const now = new Date().toISOString();
  const postData = {
    title,
    slug,
    content,
    metaDescription,
    coverImageDescription: coverImageDescription || null,
    author: author || 'Zendt Team',
    tags: tags || [],
    published: true,
    publishDate: publishDate || now,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const docRef = await db.collection('blog_posts').add(postData);

    return res.status(201).json({
      success: true,
      url: `https://zendtpayments.com/blog/${slug}`,
      id: docRef.id,
    });
  } catch (error: any) {
    console.error('Firestore insert error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create post',
      details: error.message,
    });
  }
}
