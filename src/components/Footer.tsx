import { Linkedin, Instagram, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const footerLinks = {
  Company: [
    { label: 'About Zendt', href: '/about-us' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-and-conditions' },
    { label: 'Refund Policy', href: '/refund-policy' },
  ],
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Global Coverage', href: '/#global' },
  ],
  Contact: [
    { label: 'contact@zendtpayments.com', href: 'mailto:contact@zendtpayments.com' },
    { label: 'India', href: '#' },
  ],
};

const trust = [
  { icon: <Shield size={15} />, label: 'Bank-grade Security' },
  { icon: <Zap size={15} />, label: 'Instant Transfers' },
  { icon: <Globe size={15} />, label: '30+ Currencies' },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer id="footer" className="bg-slate-950 text-white pt-16 md:pt-20 pb-8 md:pb-10">
      <div className="container">

        {/* Top CTA strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 md:pb-16 border-b border-white/10 mb-12 md:mb-16 text-center md:text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-2">Beta launching May 2026</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Be among the first to go <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">borderless.</span>
            </h3>
          </div>
          <button
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                navigate('/#pricing');
              }
            }}
            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-7 py-4 rounded-2xl transition-all shadow-xl shadow-brand-600/30 hover:-translate-y-0.5 active:scale-95 group text-sm sm:text-base"
          >
            Get Beta Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 mb-12 md:mb-16">

          {/* Brand col */}
          <div className="lg:col-span-2 space-y-5 md:space-y-6 flex flex-col items-center md:items-start text-center md:text-left">
            <a href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md">
                <img src="/logo-filled.png" alt="Zendt Payments Logo - Global Freelancer Financial OS" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Zendt Payments</span>
            </a>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xs">
              The financial operating system for global freelancers and digital citizens. Simple. Transparent. Borderless.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 pt-1">
              {trust.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium">
                  <span className="text-brand-400">{icon}</span>
                  {label}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex justify-center md:justify-start gap-4 pt-2">
              {[
                {
                  Icon: (props: any) => (
                    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  url: 'https://x.com/zendtpayments',
                  label: 'X / Twitter',
                },
                { Icon: Linkedin, url: 'https://www.linkedin.com/company/zendtpayments/', label: 'LinkedIn' },
                { Icon: Instagram, url: 'https://www.instagram.com/zendt.hq/', label: 'Instagram' },
              ].map(({ Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-300 p-2.5"
                >
                  <Icon className="w-full h-full" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 pt-4 md:pt-0">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">{heading}</h4>
                <ul className="space-y-3.5">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col items-center gap-4 text-xs text-slate-500 text-center">
          <p className="text-slate-400/80 max-w-2xl leading-relaxed">
            Banking services are offered and hosted by our RBI licensed banking partners.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center w-full gap-3 pt-2 border-t border-white/5">
            <p>© {new Date().getFullYear()} Zendt Payments Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Beta launching May 2026</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
