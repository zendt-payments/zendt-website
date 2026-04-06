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

  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 9));

  try {
    // Get total count
    const countSnap = await db
      .collection('blog_posts')
      .where('published', '==', true)
      .count()
      .get();
    const total = countSnap.data().count;

    // Get paginated posts (exclude full content for listing)
    let query = db
      .collection('blog_posts')
      .where('published', '==', true)
      .orderBy('publishDate', 'desc')
      .limit(limit);

    // For pages > 1, offset using cursor
    if (page > 1) {
      const skipSnap = await db
        .collection('blog_posts')
        .where('published', '==', true)
        .orderBy('publishDate', 'desc')
        .limit((page - 1) * limit)
        .get();

      const lastDoc = skipSnap.docs[skipSnap.docs.length - 1];
      if (lastDoc) {
        query = query.startAfter(lastDoc);
      }
    }

    const snap = await query.get();
    const posts = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        slug: data.slug,
        metaDescription: data.metaDescription,
        coverImageDescription: data.coverImageDescription,
        author: data.author,
        tags: data.tags,
        publishDate: data.publishDate,
        createdAt: data.createdAt,
      };
    });

    // Cache for 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

    return res.status(200).json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error('Firestore query error:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
