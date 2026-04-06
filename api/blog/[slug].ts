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
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug is required' });
  }

  try {
    const snap = await db
      .collection('blog_posts')
      .where('slug', '==', slug)
      .where('published', '==', true)
      .limit(1)
      .get();

    if (snap.empty) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const doc = snap.docs[0];
    const data = doc.data();

    // Cache for 10 minutes
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=60');

    return res.status(200).json({
      id: doc.id,
      ...data,
    });
  } catch (error: any) {
    console.error('Firestore query error:', error);
    return res.status(500).json({ error: 'Failed to fetch post' });
  }
}
