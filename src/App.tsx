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
import ScrollToTop from '@/components/ScrollToTop';

function HomePage() {
  return (
    <>
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
