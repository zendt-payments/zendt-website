import * as admin from 'firebase-admin';
import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  console.log('Webhook body:', JSON.stringify(req.body));
  const event = req.body;
  if (!event || event.type !== 'email.received') {
    return res.status(200).json({ message: 'Ignored' });
  }
  const from = event.data?.from || '';
  const text = event.data?.text || '';
  
  console.log('--- RECEIVED EMAIL TEXT ---');
  console.log(text);
  console.log('---------------------------');
  
  const sender = from.match(/<([^>]+)>/) ? from.match(/<([^>]+)>/)[1].toLowerCase() : from.toLowerCase().trim();
  if (sender !== ALEN_EMAIL) {
    return res.status(200).json({ message: 'Unauthorized sender' });
  }
  if (!text.toLowerCase().includes('approve')) {
    return res.status(200).json({ message: 'No APPROVE found' });
  }
  const snap = await db.collection('blog_posts').where('published', '==', false).orderBy('createdAt', 'desc').limit(1).get();
  if (snap.empty) {
    return res.status(404).json({ error: 'No unpublished post found' });
  }
  const doc = snap.docs[0];
  const post = doc.data();
  const postUrl = SITE_URL + '/blog/' + post.slug;
  await db.collection('blog_posts').doc(doc.id).update({ published: true, publishDate: new Date().toISOString(), updatedAt: new Date().toISOString() });
  await resend.emails.send({ from: FROM_EMAIL, to: ALEN_EMAIL, subject: 'Blog Published: ' + post.title, html: '<p><strong>' + post.title + '</strong> is now live. <a href="' + postUrl + '">View Post</a></p>' });
  return res.status(200).json({ success: true, url: postUrl });
}
