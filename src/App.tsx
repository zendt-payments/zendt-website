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
  return (
    <>
      <SEO />
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
