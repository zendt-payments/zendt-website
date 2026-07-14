/* Shared JSON-LD builders — inlined at build time into static pages */
export const SITE = 'https://www.zendtpayments.com';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Zendt Payments',
    legalName: 'Zendt Payments Pvt. Ltd.',
    url: `${SITE}/`,
    logo: `${SITE}/logo-full.png`,
    foundingDate: '2024-12',
    founder: [
      { '@type': 'Person', name: 'Alen Thomas' },
      { '@type': 'Person', name: 'Akshay K Rao' },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rajagiri Orbiit, Infopark Phase 1',
      addressLocality: 'Kakkanad, Kochi',
      addressRegion: 'Kerala',
      postalCode: '682042',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'Country', name: 'India' },
    // TEMP-ZWITCH: revert after approval
    description:
      'Invoicing and payments toolkit for Indian freelancers to bill international clients and receive INR settlements through licensed banking partners. Not cryptocurrency or investment.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-73560-04147',
      email: 'hello@zendtpayments.com',
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.linkedin.com/company/zendtpayments',
      'https://x.com/zendtpayments',
      'https://instagram.com/zendtpayments',
    ],
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: { '@type': 'Answer', text: q.a },
    })),
  };
}

export function articleSchema({ title, description, url, datePublished, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: 'Alen Thomas',
      jobTitle: 'Founder',
      worksFor: { '@id': `${SITE}/#organization` },
    },
    publisher: { '@id': `${SITE}/#organization` },
    inLanguage: 'en-IN',
  };
}
