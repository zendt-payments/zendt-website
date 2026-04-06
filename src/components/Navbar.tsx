import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Blog', href: '/blog' },
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Global Coverage', href: '/#global' },
  { label: 'Why Zendt', href: '/#capabilities' },
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isDarkSection, setIsDarkSection] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
             setScrolled(window.scrollY > 20);
             
             // Detect if navbar is over any dark section
             const darkSections = ['global', 'mission', 'trust', 'footer'];
             const navbarHeight = 100; // Approximate height of the navbar area + padding
             let isOverDark = false;

             for (const id of darkSections) {
                 const section = document.getElementById(id);
                 if (section) {
                     const rect = section.getBoundingClientRect();
                     // Check if navbar overlaps with this section
                     // rect.top <= navbarHeight means the top of the section has reached or passed the navbar
                     // rect.bottom >= 0 means the bottom of the section hasn't scrolled past the top of the viewport
                     if (rect.top <= navbarHeight && rect.bottom >= 0) {
                         isOverDark = true;
                         break;
                     }
                 }
             }
             
             setIsDarkSection(isOverDark);
        };
        
        handleScroll(); // Initial check
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <>
      <nav className={`fixed top-10 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'px-6 md:px-8' : 'px-6 md:px-12'}`}>
        <div className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 border ${scrolled ? (isDarkSection ? 'border-white/20 bg-white/10 backdrop-blur-2xl py-2.5 pl-4 pr-2.5' : 'border-transparent liquid-glass py-2.5 pl-4 pr-2.5') : 'border-transparent bg-transparent py-5'}`}>
            <div className="flex items-center justify-between">
                
                {/* Logo */}
                <a 
                  href="/" 
                  onClick={(e) => { e.preventDefault(); navigate('/'); }}
                  className="flex items-center gap-2.5 group"
                >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
                    <img src="/logo-filled.png" alt="Zendt Payments Logo - Global Freelancer Financial OS" className="w-full h-full object-cover" />
                </div>
                <span className={`font-bold text-xl tracking-tight transition-colors ${isDarkSection ? 'text-white' : 'text-slate-900'}`}>Zendt Payments</span>
                </a>
                
                {/* Desktop Nav */}
                <div className={`hidden md:flex items-center gap-1 rounded-full p-1.5 transition-all duration-300 ${scrolled ? 'bg-transparent' : (isDarkSection ? 'bg-white/5' : 'liquid-glass')}`}>
                {navItems.map((item) => (
                    <a 
                    key={item.label} 
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.href.startsWith('/#')) {
                        if (location.pathname === '/') {
                          document.querySelector(item.href.replace('/', ''))?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          navigate(item.href);
                        }
                      } else {
                        navigate(item.href);
                      }
                    }}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${isDarkSection
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : scrolled 
                        ? 'text-slate-600 hover:text-brand-900 hover:bg-black/5' 
                        : 'text-slate-700 hover:text-brand-900 hover:bg-white/80'}`}
                    >
                    {item.label}
                    </a>
                ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-3">
                <button 
                  onClick={() => {
                    if (location.pathname === '/') {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/#pricing');
                    }
                  }}
                  className={`text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-95 ${isDarkSection ? 'bg-white text-slate-900 hover:bg-white/90 shadow-white/20 hover:shadow-white/30' : 'bg-slate-900 text-white hover:bg-brand-600 shadow-slate-900/20 hover:shadow-brand-600/30'}`}
                >
                    Join Beta
                </button>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className={`md:hidden p-2 rounded-lg transition-colors ${isDarkSection ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-black/5'}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-50/95 backdrop-blur-3xl pt-28 px-6 md:hidden animate-fade-in-up mesh-bg min-h-screen border-b border-brand-200 shadow-2xl flex flex-col">
          <div className="flex-1 overflow-y-auto pb-8">
            <div className="flex flex-col gap-2 relative z-10 liquid-glass p-6 rounded-3xl border border-white/40">
                {navItems.map((item) => (
                    <a 
                      key={item.label} 
                      href={item.href} 
                      className="text-lg font-bold text-slate-800 py-4 border-b border-slate-200/50 last:border-0 hover:text-brand-600 transition-colors flex items-center justify-between" 
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.href.startsWith('/#')) {
                          if (location.pathname === '/') {
                            document.querySelector(item.href.replace('/', ''))?.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            navigate(item.href);
                          }
                        } else {
                          navigate(item.href);
                        }
                        setMobileMenuOpen(false);
                      }}
                    >
                        {item.label}
                        <span className="text-slate-300">→</span>
                    </a>
                ))}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-slate-200/50">
                    <button 
                      onClick={() => { 
                        if (location.pathname === '/') {
                          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          navigate('/#pricing');
                        }
                        setMobileMenuOpen(false); 
                      }}
                      className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-600/30 transition-all active:scale-95 text-base flex items-center justify-center gap-2 group"
                    >
                      Join Beta
                    </button>
                    <button 
                      onClick={() => { 
                        if (location.pathname === '/') {
                          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          navigate('/#pricing');
                        }
                        setMobileMenuOpen(false); 
                      }}
                      className="w-full py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all active:scale-95 text-base mt-2"
                    >
                      Explore Pricing
                    </button>
                </div>
            </div>
            
            {/* Absolute decorative blobs for the mobile menu */}
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-brand-300/20 rounded-full blur-[80px] -z-10 mix-blend-multiply" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-blue-300/20 rounded-full blur-[80px] -z-10 mix-blend-multiply" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
