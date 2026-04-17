import { Routes, Route } from 'react-router-dom';
import BetaBanner from '@/components/BetaBanner';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import GlobalCoverage from '@/components/GlobalCoverage';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Capabilities from '@/components/Capabilities';
import Mission from '@/components/Mission';
import TrustSection from '@/components/TrustSection';
import Contact from '@/components/Contact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import AboutPage from '@/pages/AboutPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsAndConditionsPage from '@/pages/TermsAndConditionsPage';
import RefundPolicyPage from '@/pages/RefundPolicyPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ScrollToTop from '@/components/ScrollToTop';
import SEO from '@/components/SEO';

function HomePage() {
  // Organization + WebSite structured data for Google Knowledge Panel
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zendt Payments',
    url: 'https://zendtpayments.com',
    logo: 'https://zendtpayments.com/logo-filled.png',
    description: 'The modern payment platform for Indian freelancers to receive international payments, manage multiple currencies, and withdraw to INR.',
    foundingDate: '2024',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kochi',
        addressRegion: 'Kerala',
        addressCountry: 'IN',
      },
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@zendtpayments.com',
      contactType: 'customer support',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Zendt Payments',
    url: 'https://zendtpayments.com',
    description: 'The best payment solution for Indian freelancers to receive USD, EUR, GBP, AED payments and withdraw to INR.',
    inLanguage: 'en',
  };

  // FAQ schema — these match common search queries from Indian freelancers
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can Indian freelancers receive international payments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Indian freelancers can use Zendt to receive international payments in USD, EUR, GBP, AED and 30+ currencies through global receiving accounts. Payments can then be withdrawn directly to an Indian bank account in INR with low fees and competitive exchange rates.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the fees for receiving international payments in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Traditional banks charge 3-5% in hidden exchange rate markups plus wire transfer fees. Zendt offers near mid-market exchange rates with transparent, low fees — helping freelancers save up to 40% on every international payment received.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I receive payments from UAE and Middle East clients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Zendt supports payments from UAE (AED), Saudi Arabia (SAR), Qatar (QAR), Kuwait (KWD), Oman (OMR), and Bahrain (BHD). Freelancers working with GCC clients can receive payments smoothly and withdraw to their Indian bank accounts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Zendt compliant with RBI regulations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Zendt works with RBI-licensed banking partners to ensure full compliance with Indian foreign exchange regulations for receiving international payments.',
        },
      },
    ],
  };

  return (
    <>
      <SEO
        title="Zendt | The Best Payment Solution for Indian Freelancers — Receive International Payments"
        description="Receive international payments in USD, EUR, GBP, AED & 30+ currencies. The modern payment platform built for Indian freelancers. Low fees, fast INR withdrawals, RBI compliant."
        url="https://zendtpayments.com"
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Hero />
      <GlobalCoverage />
      <Features />
      <HowItWorks />
      <Capabilities />
      <Mission />
      <TrustSection />
      <Contact />
      <CTA />
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <BetaBanner />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
