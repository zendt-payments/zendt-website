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

const SITE_URL = 'https://zendtpayments.com';

// Static pages with their change frequency and priority
const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about-us', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'daily', priority: '0.9' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-and-conditions', changefreq: 'yearly', priority: '0.3' },
  { path: '/refund-policy', changefreq: 'yearly', priority: '0.3' },
];

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    // Fetch all published blog posts
    const snap = await db
      .collection('blog_posts')
      .where('published', '==', true)
      .orderBy('publishDate', 'desc')
      .get();

    const blogPosts = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        slug: data.slug as string,
        updatedAt: data.updatedAt as string,
        publishDate: data.publishDate as string,
      };
    });

    // Build XML
    const urls = [
      // Static pages
      ...STATIC_PAGES.map(
        (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      ),
      // Blog posts
      ...blogPosts.map(
        (post) => `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updatedAt || post.publishDate).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      ),
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    // Cache for 1 hour, serve stale for 5 min while revalidating
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=300');
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);

    // Fallback to static pages only
    const fallbackUrls = STATIC_PAGES.map(
      (page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    );

    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${fallbackUrls.join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(fallback);
  }
}
