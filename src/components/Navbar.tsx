import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isDarkSection, setIsDarkSection] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
             setScrolled(window.scrollY > 20);
             
             // Detect if navbar is over dark section
             const missionSection = document.getElementById('mission');
             if (missionSection) {
                 const navbarHeight = 100;
                 const missionTop = missionSection.getBoundingClientRect().top;
                 const missionBottom = missionTop + missionSection.offsetHeight;
                 setIsDarkSection(missionTop < navbarHeight && missionBottom > 0);
             }
        };
        
        handleScroll(); // Initial check
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <>
      <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'px-4 md:px-8' : 'px-4 md:px-12'}`}>
        <div className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 border ${scrolled ? (isDarkSection ? 'border-white/20 bg-white/10 backdrop-blur-2xl py-2.5 pl-4 pr-2.5' : 'border-transparent liquid-glass py-2.5 pl-4 pr-2.5') : 'border-transparent bg-transparent py-5'}`}>
            <div className="flex items-center justify-between">
                
                {/* Logo */}
                <a href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
                    <img src="/logo-filled.png" alt="Zendt Logo" className="w-full h-full object-cover" />
                </div>
                <span className={`font-bold text-xl tracking-tight transition-colors ${isDarkSection ? 'text-white' : 'text-slate-900'}`}>Zendt</span>
                </a>
                
                {/* Desktop Nav */}
                <div className={`hidden md:flex items-center gap-1 rounded-full p-1.5 transition-all duration-300 ${scrolled ? 'bg-transparent' : (isDarkSection ? 'bg-white/5' : 'liquid-glass')}`}>
                {['Features', 'Capabilities', 'Global', 'Pricing'].map((item) => (
                    <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${isDarkSection
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : scrolled 
                        ? 'text-slate-600 hover:text-brand-900 hover:bg-black/5' 
                        : 'text-slate-700 hover:text-brand-900 hover:bg-white/80'}`}
                    >
                    {item}
                    </a>
                ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-3">
                <a href="/login" className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${isDarkSection ? 'text-white/90 hover:text-white hover:bg-white/10' : scrolled ? 'text-slate-600 hover:text-brand-700 hover:bg-black/5' : 'text-slate-700 hover:bg-white/50'}`}>
                    Log in
                </a>
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className={`text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-95 ${isDarkSection ? 'bg-white text-slate-900 hover:bg-white/90 shadow-white/20 hover:shadow-white/30' : 'bg-slate-900 text-white hover:bg-brand-600 shadow-slate-900/20 hover:shadow-brand-600/30'}`}
                >
                    Join Waitlist
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
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden animate-fade-in-up">
            <div className="flex flex-col gap-4">
                {['Features', 'Capabilities', 'Global', 'Pricing'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="text-xl font-bold text-slate-900 py-3 border-b border-slate-100" onClick={() => setMobileMenuOpen(false)}>
                        {item}
                    </a>
                ))}
                <div className="flex flex-col gap-3 mt-4">
                    <a href="/login" className="w-full text-center py-3 font-semibold text-slate-600 bg-slate-50 rounded-xl">Log in</a>
                    <button 
                      onClick={() => { setMobileMenuOpen(false); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30"
                    >
                      Join Waitlist
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
