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

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    // Fetch latest 50 published posts
    const snap = await db
      .collection('blog_posts')
      .where('published', '==', true)
      .orderBy('publishDate', 'desc')
      .limit(50)
      .get();

    const posts = snap.docs.map((doc) => doc.data());

    const items = posts
      .map(
        (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.metaDescription)}</description>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <author>hello@zendtpayments.com (${escapeXml(post.author)})</author>${
          post.tags && post.tags.length > 0
            ? '\n' + post.tags.map((tag: string) => `      <category>${escapeXml(tag)}</category>`).join('\n')
            : ''
        }
    </item>`
      )
      .join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zendt Payments Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Expert insights on international payments, freelancer finance, cross-border banking, and building a borderless career.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/logo-filled.png</url>
      <title>Zendt Payments Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
${items}
  </channel>
</rss>`;

    // Cache for 1 hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=300');
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    return res.status(200).send(rss);
  } catch (error) {
    console.error('RSS feed generation error:', error);
    return res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title></channel></rss>');
  }
}
