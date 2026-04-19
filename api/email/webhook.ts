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
  console.log('Step 1: checking event type');
  if (!event || event.type !== 'email.received') {
    return res.status(200).json({ message: 'Ignored' });
  }
  
  const from = event.data?.from || '';
  const subject = event.data?.subject || '';
  const sender = from.match(/<([^>]+)>/) ? from.match(/<([^>]+)>/)[1].toLowerCase() : from.toLowerCase().trim();
  
  console.log('Step 2: checking sender', sender);
  if (sender !== ALEN_EMAIL) {
    return res.status(200).json({ message: 'Unauthorized sender' });
  }
  
  const toAddresses = Array.isArray(event.data?.to) ? event.data.to : [event.data?.to];
  console.log('Step 3: checking to address', toAddresses);
  
  const isToApprove = toAddresses.some((addr: any) => String(addr).toLowerCase().includes('approve@istiapeleo'));
  if (!isToApprove) {
    return res.status(200).json({ message: 'Not sent to approve address' });
  }
  
  if (!subject.toLowerCase().includes('re:')) {
    return res.status(200).json({ message: 'Not a reply (missing Re:)' });
  }
  
  console.log('Step 4: querying Firestore');
  const snap = await db.collection('blog_posts').where('published', '==', false).orderBy('createdAt', 'desc').limit(1).get();
  if (snap.empty) {
    return res.status(404).json({ error: 'No unpublished post found' });
  }
  
  const doc = snap.docs[0];
  const post = doc.data();
  const postUrl = SITE_URL + '/blog/' + post.slug;
  
  console.log('Step 5: updating Firestore');
  await db.collection('blog_posts').doc(doc.id).update({ published: true, publishDate: new Date().toISOString(), updatedAt: new Date().toISOString() });
  
  console.log('Step 6: sending confirmation email');
  await resend.emails.send({ from: FROM_EMAIL, to: ALEN_EMAIL, subject: 'Blog Published: ' + post.title, html: '<p><strong>' + post.title + '</strong> is now live. <a href="' + postUrl + '">View Post</a></p>' });
  
  return res.status(200).json({ success: true, url: postUrl });
}
