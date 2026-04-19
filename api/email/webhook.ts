import * as admin from 'firebase-admin';
import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);
const SITE_URL = 'https://zendtpayments.com';
const ALEN_EMAIL = 'alen@zendtpayments.com';
const FROM_EMAIL = 'marketing@zendtpayments.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('Webhook received');
  try {
    if (!admin.apps.length) {
      console.log('Initializing Firebase...');
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
      console.log('Firebase initialized');
    }
    
    console.log('Firebase project:', process.env.FIREBASE_PROJECT_ID);
    console.log('Resend key exists:', !!process.env.RESEND_API_KEY);
    
    const db = admin.firestore();
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
    
    console.log('Step 4: querying blog_drafts');
    const snap = await db.collection('blog_drafts')
      .where('status', '==', 'draft')
      .limit(1)
      .get();
      
    if (snap.empty) {
      console.log('No drafts found in blog_drafts');
      return res.status(404).json({ error: 'No draft found' });
    }
    
    const doc = snap.docs[0];
    const draft = doc.data();
    const { title, slug, content, metaDescription, publishDate, coverImageDescription } = draft;
    
    console.log('Step 5: POSTing to BLOG_API_URL', process.env.BLOG_API_URL);
    const publishRes = await fetch(process.env.BLOG_API_URL!, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'x-api-key': process.env.BLOG_API_KEY! 
      },
      body: JSON.stringify({ title, slug, content, metaDescription, publishDate, coverImageDescription })
    });
    
    if (!publishRes.ok) {
      const errText = await publishRes.text();
      console.error('Publish API failed:', publishRes.status, errText);
      return res.status(500).json({ error: 'Publish API failed', details: errText });
    }
    
    console.log('Step 6: updating blog_drafts status to published');
    await db.collection('blog_drafts').doc(doc.id).update({ 
      status: 'published', 
      updatedAt: new Date().toISOString() 
    });
    
    const postUrl = SITE_URL + '/blog/' + slug;
    
    console.log('Step 7: sending confirmation email');
    await resend.emails.send({ 
      from: FROM_EMAIL, 
      to: ALEN_EMAIL, 
      subject: 'Blog Published: ' + title, 
      html: '<p><strong>' + title + '</strong> is now live. <a href="' + postUrl + '">View Post</a></p>' 
    });
    
    return res.status(200).json({ success: true, url: postUrl });
  } catch (err: any) {
    console.error('WEBHOOK ERROR:', err.message, err.stack);
    return res.status(500).json({ error: err.message });
  }
}
