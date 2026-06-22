#!/usr/bin/env node
/**
 * Generates SEO content pages for zendtpayments.com (static HTML).
 * Run: node scripts/build-seo-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SITE,
  organizationSchema,
  breadcrumbSchema,
  faqSchema,
  articleSchema,
} from '../assets/seo/schema-snippets.js';
import { siteFooter } from '../assets/seo/footer-snippet.js';
import { navStoreBadges } from '../assets/seo/store-badges.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DATE = '2026-06-09';

function rel(depth) {
  return depth ? '../'.repeat(depth) : '';
}

function ldJson(obj) {
  return `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`;
}

function head({ depth, title, description, canonical, extraSchema = [] }) {
  const r = rel(depth);
  const schemas = [organizationSchema(), ...extraSchema];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${title}</title>
<meta name="description" content="${description}" />
<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="author" content="Zendt Payments Pvt. Ltd." />
<link rel="canonical" href="${canonical}" />
<link rel="icon" type="image/png" href="${r}logo-mark.png" />
<link rel="manifest" href="${r}site.webmanifest" />
<meta property="og:site_name" content="Zendt Payments" />
<meta property="og:locale" content="en_IN" />
<meta property="og:type" content="article" />
<meta property="og:url" content="${canonical}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${SITE}/logo-full.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${SITE}/logo-full.png" />
${ldJson(schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas })}
<link rel="preconnect" href="https://api.fontshare.com" crossorigin />
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${r}assets/css/shared.css" />
<link rel="stylesheet" href="${r}assets/css/content-pages.css" />
<link rel="stylesheet" href="${r}assets/css/responsive.css" />
<link rel="stylesheet" href="${r}assets/css/motion.css" />
</head>`;
}

function nav(depth) {
  const r = rel(depth);
  return `<nav class="nav" id="nav">
  <div class="wrap nav__inner">
    <div class="nav__brand">
      <a class="logo" href="${r}index.html#top" aria-label="Zendt Payments home"><span class="logo__mark" aria-hidden="true"></span></a>
    </div>
    <div class="nav__links">
      <a href="${r}index.html#top">Home</a>
      <a href="${r}how-it-works.html">How it works</a>
      <a href="${r}features.html">Features</a>
      <a href="${r}pricing.html">Pricing</a>
      <a href="${r}index.html#compare">Compare</a>
      <a href="${r}story.html">Story</a>
      <a href="${r}contact.html">Contact</a>
    </div>
    <div class="nav__right">
      <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme" title="Toggle theme">
        <svg class="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg class="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <button class="nav__toggle" id="navToggle" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
      ${navStoreBadges(r)}
    </div>
  </div>
</nav>`;
}

function localHref(depth, sitePath) {
  const r = rel(depth);
  if (!sitePath || sitePath === '/') return `${r}index.html`;
  if (sitePath === 'compare') return `${r}compare/index.html`;
  return `${r}${sitePath}`;
}

function footer(depth) {
  return `${siteFooter(rel(depth))}
<script src="${rel(depth)}assets/js/site.js" defer></script>`;
}

function page({ file, depth, title, meta, breadcrumb, heroMeta, body, faqs, article }) {
  const canonical = `${SITE}/${file.replace(/\.html$/, '').replace(/\/index$/, '')}`;
  const crumbs = [{ name: 'Home', url: `${SITE}/` }, ...breadcrumb];
  const schemas = [breadcrumbSchema(crumbs)];
  if (article) {
    schemas.push(
      articleSchema({
        title,
        description: meta,
        url: canonical,
        datePublished: DATE,
        dateModified: DATE,
      })
    );
  }
  if (faqs?.length) schemas.push(faqSchema(faqs));

  const breadcrumbHtml = crumbs
    .map((c, i) => {
      const isLast = i === crumbs.length - 1;
      if (isLast) return `<span aria-current="page">${c.name}</span>`;
      const path = c.url.replace(`${SITE}/`, '').replace(/\/$/, '');
      const href = localHref(depth, path || '/');
      return `<a href="${href}">${c.name}</a><span aria-hidden="true">/</span>`;
    })
    .join(' ');

  const faqHtml = faqs?.length
    ? `<div class="faq-block"><h2>Frequently asked questions</h2>${faqs.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div>`
    : '';

  const html = `${head({ depth, title, description: meta, canonical, extraSchema: schemas })}
<body>
<a href="#main" class="skip-link">Skip to main content</a>
${nav(depth)}
<main id="main">
  <header class="page-hero wrap">
    <nav class="breadcrumb reveal" aria-label="Breadcrumb">${breadcrumbHtml}</nav>
    <p class="page-hero__meta reveal">${heroMeta}</p>
    <h1 class="reveal">${title.replace(/ · Zendt.*/, '').split(' — ')[0]}</h1>
  </header>
  <section class="legal">
    <div class="wrap legal__inner reveal">
      ${body}
      ${faqHtml}
    </div>
  </section>
</main>
${footer(depth)}
</body>
</html>`;

  const outPath = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log('wrote', file);
}

const compareTable = (rows) => `<table class="cmp-table"><thead><tr><th>Feature</th><th>Zendt</th><th>Alternative</th></tr></thead><tbody>${rows.map(([f, z, a]) => `<tr><td>${f}</td><td class="is-zendt">${z}</td><td>${a}</td></tr>`).join('')}</tbody></table>`;

// --- Pages ---
page({
  file: 'about.html',
  depth: 0,
  title: 'About Zendt Payments — Indian Freelancer Payment Platform',
  meta: 'Zendt Payments Pvt. Ltd. is a Kochi-based fintech building licensed payment infrastructure for Indian freelancers receiving international and domestic client payments.',
  breadcrumb: [{ name: 'About', url: `${SITE}/about` }],
  heroMeta: 'Company',
  article: true,
  body: `<p><strong>Zendt Payments Pvt. Ltd.</strong> builds payment infrastructure for Indian freelancers and independent professionals. We help you invoice international clients, share payment links in 150+ fiat currencies, and settle proceeds to your INR bank account — with domestic UPI collections for Indian clients on the same platform.</p>
<h2>Who we are</h2>
<p>Founded by <strong>Alen Thomas &amp; Akshay K Rao</strong> in Kochi, Kerala, Zendt was built around a gap other platforms miss: Indian freelancers earning from the Gulf, US, UK, and EU need one place to get paid without losing 6–9% to hidden FX and correspondent bank fees.</p>
<h2>Regulatory model</h2>
<ul>
<li><strong>Legal entity:</strong> Zendt Payments Pvt. Ltd., India</li>
<li><strong>Office:</strong> Rajagiri Orbiit, Infopark Phase 1, Kakkanad, Kochi, Kerala</li>
<li><strong>Banking &amp; settlement:</strong> RBI-licensed banking and payment partners (disclosed on site)</li>
<li><strong>Infrastructure:</strong> Zwitch</li>
<li><strong>Compliance:</strong> KYC, AML, and FEMA-aligned onboarding</li>
</ul>
<p>Zendt is <strong>not</strong> a cryptocurrency exchange, investment platform, or forex trading product. We process fiat client payments only.</p>
<h2>Contact</h2>
<p>Email <a href="mailto:hello@zendtpayments.com">hello@zendtpayments.com</a> · Phone <a href="tel:+917356004147">+91 73560 04147</a></p>`,
});

page({
  file: 'how-it-works.html',
  depth: 0,
  title: 'How Zendt Works — Receive International Payments in India',
  meta: 'Four steps to get paid from abroad: create an invoice, share a payment link, client pays in their currency, funds settle to your INR bank account.',
  breadcrumb: [{ name: 'How it works', url: `${SITE}/how-it-works` }],
  heroMeta: 'Product · How it works',
  article: true,
  body: `<p>Zendt lets Indian freelancers receive international client payments in 150+ currencies and settle to an INR bank account in as few as three business days — without SWIFT paperwork or correspondent bank deductions.</p>
<h2>Step 1 — Create &amp; send an invoice</h2>
<p>Build a professional invoice in seconds. A payment link is generated automatically and embedded in the invoice for domestic and international clients.</p>
<h2>Step 2 — Share your payment link</h2>
<p>One link works for every client and currency. Send via WhatsApp, email, or attach to your invoice.</p>
<h2>Step 3 — Client pays in their currency</h2>
<p>Your client checks out in USD, AED, GBP, EUR, or 145+ other fiat currencies. Domestic Indian clients can pay via UPI, card, or netbanking.</p>
<h2>Step 4 — Money settles in INR</h2>
<p>Funds reach your Indian bank account at live mid-market FX. T+3 for international receipts, T+1 for domestic. Zendt handles compliance and partner settlement.</p>
<p><a href="pricing.html">See pricing</a> · <a href="index.html#waitlist">Join the waitlist</a></p>`,
});

page({
  file: 'features.html',
  depth: 0,
  title: 'Zendt Features — Invoicing, Payment Links &amp; INR Settlement',
  meta: 'Payment links, invoice management, earnings dashboard, freelancer profile, 150+ currencies, and domestic UPI — one platform for Indian freelancers.',
  breadcrumb: [{ name: 'Features', url: `${SITE}/features` }],
  heroMeta: 'Product · Features',
  article: true,
  body: `<p>Zendt is payment infrastructure for Indian freelancers — not a workaround. Everything you need to earn, invoice, and settle in one surface.</p>
<h2>Payment links</h2>
<p>Shareable, brandable links to accept any supported currency with one click for your client.</p>
<h2>Invoice management</h2>
<p>Professional invoices with status tracking, reminders, and reconciliation — no spreadsheet required.</p>
<h2>Earnings dashboard</h2>
<p>Income by client, currency, and month. Forecast, filter, and export for your CA.</p>
<h2>Public freelancer profile</h2>
<p>A credible portfolio page with services, rates, and a built-in payment button.</p>
<h2>150+ currencies</h2>
<p>Receive from US, UK, UAE, Saudi, Qatar, Australia, Canada, EU, Singapore, and more at live FX.</p>
<h2>Domestic UPI</h2>
<p>Flat 0.6% on UPI from Indian clients with invoicing, links, and tracking included.</p>`,
});

const comparisons = [
  {
    file: 'compare/zendt-vs-payoneer.html',
    slug: 'zendt-vs-payoneer',
    alt: 'Payoneer',
    blurb: 'GCC corridor support, domestic UPI, and a flat 4% international rate with no hidden FX markup.',
    tags: ['4% flat fee', 'GCC support', 'UPI included'],
    intro: 'Payoneer is a global payout platform used by many Indian freelancers. Zendt is built specifically for India — GCC corridor support, domestic UPI, and a flat 4% international rate with no hidden FX markup.',
    rows: [
      ['International fee', '4% flat on settlement', '3–5% + FX spread'],
      ['GCC / AED support', 'Full corridor support', 'Limited Gulf coverage'],
      ['Domestic UPI', '0.6% with full platform', 'Not available'],
      ['INR settlement', 'Direct to Indian bank', 'Via Payoneer balance → withdrawal'],
      ['Freelancer profile', 'Included', 'Not included'],
      ['Settlement (intl)', 'T+3 business days', '3–5+ days typical'],
    ],
    faqs: [
      { q: 'Is Zendt a Payoneer alternative in India?', a: 'Yes. Zendt is designed for Indian freelancers who want INR settlement, GCC client support, and domestic UPI in one platform at transparent published rates.' },
      { q: 'Is Zendt cheaper than Payoneer?', a: 'Zendt charges a flat 4% on international receipts with no FX markup beyond the live mid-market rate. Payoneer total cost often includes FX spread and withdrawal fees that push effective rates higher.' },
    ],
  },
  {
    file: 'compare/zendt-vs-skydo.html',
    slug: 'zendt-vs-skydo',
    alt: 'Skydo',
    blurb: 'Gulf corridor coverage, domestic UPI at 0.6%, and a freelancer profile in one platform.',
    tags: ['Gulf corridor', 'Domestic UPI', 'Freelancer profile'],
    intro: 'Skydo and Zendt both serve Indian freelancers receiving international payments. Zendt differentiates on GCC corridor coverage, domestic UPI at 0.6%, and a freelancer profile — in one platform.',
    rows: [
      ['International fee', '4% flat', 'Published tiered rates'],
      ['GCC support', '150+ currencies incl. AED, SAR, QAR', 'Varies by corridor'],
      ['Domestic UPI', '0.6%', 'Focus on international'],
      ['Payment link + invoice', 'Yes', 'Yes'],
      ['Freelancer profile', 'Yes', 'Limited'],
      ['Settlement', 'T+3 intl · T+1 domestic', 'Varies'],
    ],
    faqs: [
      { q: 'How does Zendt compare to Skydo?', a: 'Both platforms help Indian freelancers receive foreign client payments. Zendt emphasises Gulf corridor support, flat 4% international pricing, and domestic UPI on the same dashboard.' },
    ],
  },
  {
    file: 'compare/zendt-vs-wise.html',
    slug: 'zendt-vs-wise',
    alt: 'Wise',
    blurb: 'Purpose-built for Indian freelancers invoicing clients and settling to INR with compliance handled end-to-end.',
    tags: ['Payment links', 'GCC corridor', 'INR settlement'],
    intro: 'Wise (formerly TransferWise) is excellent for personal transfers and some business use cases. Zendt is purpose-built for Indian freelancers invoicing clients and settling to INR with compliance handled end-to-end.',
    rows: [
      ['Built for freelancers', 'Invoicing + links + profile', 'General transfers'],
      ['Client payment link', 'Native checkout in client currency', 'Account details / manual transfer'],
      ['GCC corridor', 'Designed for Gulf clients', 'Supported but not specialised'],
      ['Domestic UPI', '0.6%', 'Not a core product'],
      ['INR settlement', 'To Indian bank after KYC', 'To Indian bank'],
      ['Pricing model', '4% flat platform fee', 'Per-transfer fees + FX'],
    ],
    faqs: [
      { q: 'Should I use Wise or Zendt as a freelancer?', a: 'Wise works well for ad-hoc transfers. Zendt is better when you invoice clients regularly, need payment links, want domestic and international in one place, and prefer a flat published fee on cross-border receipts.' },
    ],
  },
  {
    file: 'compare/zendt-vs-briskpe.html',
    slug: 'zendt-vs-briskpe',
    alt: 'BriskPe',
    blurb: 'Compare fees, GCC support, and whether domestic collections are included on one dashboard.',
    tags: ['Indian fintech', 'Payment links', 'GCC currencies'],
    intro: 'BriskPe and Zendt both target Indian businesses and freelancers receiving foreign payments. Compare fees, GCC support, and whether domestic collections are included.',
    rows: [
      ['International pricing', '4% flat published', 'Varies — check published rates'],
      ['Payment links', 'Yes', 'Yes'],
      ['GCC currencies', 'AED, SAR, QAR native support', 'Check current coverage'],
      ['Domestic UPI', '0.6% with platform', 'Varies'],
      ['Freelancer profile', 'Yes', 'Varies'],
      ['Settlement to INR', 'Licensed partner settlement', 'Licensed partner settlement'],
    ],
    faqs: [
      { q: 'Is Zendt similar to BriskPe?', a: 'Both are Indian fintech platforms for cross-border collections. Compare published fee schedules, GCC currency support, and whether domestic UPI is included before choosing.' },
    ],
  },
];

page({
  file: 'compare/index.html',
  depth: 1,
  title: 'Compare Zendt — Payoneer, Skydo, Wise &amp; BriskPe',
  meta: 'Compare Zendt with Payoneer, Skydo, Wise, and BriskPe for Indian freelancers: fees, GCC support, UPI, INR settlement, and payment links.',
  breadcrumb: [{ name: 'Compare', url: `${SITE}/compare` }],
  heroMeta: 'Compare · Alternatives',
  article: true,
  body: `<p>Choosing how to receive international client payments? Compare Zendt side-by-side with the platforms Indian freelancers use most — fees, Gulf corridor support, domestic UPI, and INR settlement.</p>
<div class="compare-list">
${comparisons.map((c) => `<a class="compare-card" href="/compare/${c.slug}">
  <div class="compare-card__head"><h3>Zendt vs ${c.alt}</h3><span class="compare-card__arrow" aria-hidden="true">→</span></div>
  <p>${c.blurb}</p>
  <div class="compare-card__tags">${c.tags.map((t) => `<span class="compare-card__tag">${t}</span>`).join('')}</div>
</a>`).join('\n')}
</div>
<p>Based on publicly available information as of June 2026. <a href="../pricing.html">See Zendt pricing</a>.</p>`,
});

for (const c of comparisons) {
  page({
    file: c.file,
    depth: 1,
    title: `Zendt vs ${c.alt} for Indian Freelancers`,
    meta: `Compare Zendt and ${c.alt} for Indian freelancers: fees, GCC support, UPI, INR settlement, and payment links.`,
    breadcrumb: [
      { name: 'Compare', url: `${SITE}/compare` },
      { name: `Zendt vs ${c.alt}`, url: `${SITE}/compare/${c.slug}` },
    ],
    heroMeta: `Compare · Zendt vs ${c.alt}`,
    article: true,
    faqs: c.faqs,
    body: `<p>${c.intro}</p>
<h2>Side-by-side comparison</h2>
${compareTable(c.rows)}
<p>Based on publicly available information as of June 2026. <a href="../pricing.html">See Zendt pricing</a>.</p>`,
  });
}

const corridors = [
  {
    file: 'receive-payments/uae.html',
    slug: 'uae',
    country: 'UAE',
    currency: 'AED and USD',
    intro: 'Indian freelancers with Dubai and UAE clients can receive AED or USD payments through Zendt and settle to an INR bank account at live mid-market FX — without losing 6–9% to wire fees and hidden spreads.',
  },
  {
    file: 'receive-payments/saudi-arabia.html',
    slug: 'saudi-arabia',
    country: 'Saudi Arabia',
    currency: 'SAR',
    intro: 'Receive Saudi Riyal payments from Riyadh and GCC clients. Zendt settles to your Indian bank account in INR with transparent 4% platform fee and T+3 international settlement.',
  },
  {
    file: 'receive-payments/qatar.html',
    slug: 'qatar',
    country: 'Qatar',
    currency: 'QAR',
    intro: 'Freelancers working with Qatari clients can collect QAR via payment link, with funds converted and settled to INR through licensed banking partners.',
  },
];

for (const c of corridors) {
  page({
    file: c.file,
    depth: 1,
    title: `Receive ${c.country} Client Payments in India`,
    meta: `How Indian freelancers receive ${c.currency} payments from ${c.country} clients and settle to an INR bank account with Zendt.`,
    breadcrumb: [
      { name: 'Receive payments', url: `${SITE}/receive-payments/uae` },
      { name: c.country, url: `${SITE}/receive-payments/${c.slug}` },
    ],
    heroMeta: `GCC · ${c.country}`,
    article: true,
    faqs: [
      { q: `How do I get paid from ${c.country} as an Indian freelancer?`, a: `Send your client a Zendt invoice or payment link. They pay in ${c.currency}. After KYC verification, funds settle to your Indian bank account in INR at the live mid-market rate, minus the published 4% platform fee and applicable GST on the fee.` },
      { q: 'Is this FEMA compliant?', a: 'Zendt operates through RBI-licensed banking partners with KYC/AML onboarding. Export of services receipts must follow applicable FEMA and GST rules for your business structure.' },
    ],
    body: `<p>${c.intro}</p>
<h2>How it works for ${c.country} clients</h2>
<ol>
<li>Create an invoice or payment link in Zendt</li>
<li>Your ${c.country} client pays in ${c.currency}</li>
<li>Zendt converts at live mid-market FX and settles INR to your bank account (T+3 international)</li>
</ol>
<h2>Why freelancers choose Zendt for the Gulf</h2>
<p>Most global platforms under-support GCC corridors. Zendt was built where Indian freelancers actually earn — UAE, Saudi, and Qatar included in 150+ supported currencies.</p>
<p><a href="../pricing.html">See fees</a> · <a href="../index.html#waitlist">Request early access</a></p>`,
  });
}

const guides = [
  {
    file: 'guides/fira-for-freelancers.html',
    slug: 'fira-for-freelancers',
    title: 'FIRA for Freelancers — What Indian Exporters Need to Know',
    meta: 'What is a FIRA certificate, when freelancers need it, and how foreign inward remittance advice relates to export of services from India.',
    body: `<p>A <strong>FIRA (Foreign Inward Remittance Advice)</strong> is documentation that a foreign payment was received into India. For freelancers exporting services, your bank or payment partner typically issues remittance advice when international client funds settle to your INR account.</p>
<h2>When do freelancers need FIRA?</h2>
<p>You may need FIRA or equivalent inward remittance proof for:</p>
<ul>
<li>GST export documentation and LUT filings</li>
<li>Income tax assessment of foreign receipts</li>
<li>CA audit and FEMA compliance records</li>
</ul>
<h2>How Zendt helps</h2>
<p>Zendt settles international receipts to your Indian bank account through licensed partners, with transaction records in your dashboard for reconciliation and export documentation.</p>
<p>This guide is general information, not tax or legal advice. Consult your CA for your specific situation.</p>`,
  },
  {
    file: 'guides/gst-export-of-services.html',
    slug: 'gst-export-of-services',
    title: 'GST on Freelance Income from Abroad — Export of Services',
    meta: 'GST treatment for Indian freelancers receiving foreign client payments: export of services, LUT, zero-rated supplies, and 18% GST on platform fees.',
    body: `<p>Indian freelancers receiving payment from foreign clients for services typically treat receipts as <strong>export of services</strong> under GST when place-of-supply rules are met (client outside India, payment in convertible foreign exchange, etc.).</p>
<h2>Zero-rated export vs domestic GST</h2>
<p>Qualifying export of services may be zero-rated. Many freelancers file under LUT (Letter of Undertaking) to export without charging IGST. Rules depend on your registration status and contract structure.</p>
<h2>GST on Zendt platform fees</h2>
<p>Zendt charges 18% GST on the platform fee (not on the full client payment). GST-registered users may claim input credit on this fee per applicable rules.</p>
<p>Consult a qualified tax professional for your registration and filing obligations.</p>`,
  },
  {
    file: 'guides/lrs-freelancer-income.html',
    slug: 'lrs-freelancer-income',
    title: 'LRS and Freelancer Foreign Income — What Applies',
    meta: 'Liberalised Remittance Scheme limits apply to outbound remittances from India. Freelancers receiving foreign client payments inbound are governed by FEMA export rules, not LRS outflows.',
    body: `<p>The <strong>Liberalised Remittance Scheme (LRS)</strong> governs how much Indian residents can remit <em>out of</em> India per financial year (investments, education abroad, etc.). It does not cap legitimate <em>inbound</em> receipts for export of services.</p>
<h2>Freelancer inbound payments</h2>
<p>Foreign client payments for services are generally treated as export receipts, subject to FEMA and RBI rules on export realization — not LRS limits.</p>
<h2>Tax on foreign income</h2>
<p>Foreign income is typically taxable in India for residents. Maintain FIRA/remittance records and consult your CA on advance tax and ITR filing.</p>`,
  },
];

page({
  file: 'guides/index.html',
  depth: 1,
  title: 'Freelancer Payment Guides — FIRA, GST &amp; FEMA',
  meta: 'Guides for Indian freelancers on FIRA certificates, GST export of services, LRS, and receiving international client payments legally.',
  breadcrumb: [{ name: 'Guides', url: `${SITE}/guides` }],
  heroMeta: 'Resources · Guides',
  article: true,
  body: `<p>Practical guides for Indian freelancers receiving international client payments — compliance, tax, and settlement basics.</p>
<div class="guide-list">
  <a href="fira-for-freelancers.html"><h3>FIRA for freelancers</h3><p>Foreign inward remittance advice and export documentation.</p></a>
  <a href="gst-export-of-services.html"><h3>GST on export of services</h3><p>LUT, zero-rated exports, and GST on platform fees.</p></a>
  <a href="lrs-freelancer-income.html"><h3>LRS &amp; foreign income</h3><p>What LRS covers — and what applies to inbound client payments.</p></a>
</div>`,
});

for (const g of guides) {
  page({
    file: g.file,
    depth: 1,
    title: g.title,
    meta: g.meta,
    breadcrumb: [
      { name: 'Guides', url: `${SITE}/guides` },
      { name: g.title.split(' — ')[0], url: `${SITE}/guides/${g.slug}` },
    ],
    heroMeta: 'Guide',
    article: true,
    body: g.body,
  });
}

console.log('Done.');
