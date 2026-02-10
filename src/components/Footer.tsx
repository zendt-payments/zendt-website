import {Linkedin, Instagram } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-24 mb-16">
          <div className="lg:col-span-1 space-y-6">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
                <img src="/logo-filled.png" alt="Zendt Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Zendt</span>
            </a>
            <p className="text-slate-500 leading-relaxed">
              The financial operating system for global citizens. Building the future of borderless work.
            </p>
            <div className="flex gap-4 pt-2">
               {[
                 { 
                   Icon: (props: any) => (
                     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                       <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                     </svg>
                   ), 
                   url: 'https://x.com/zendtpayments' 
                 },
                 { Icon: Linkedin, url: 'https://www.linkedin.com/company/zendtpayments/' },
                 { Icon: Instagram, url: 'https://www.instagram.com/zendt.hq/' }
               ].map(({ Icon, url }, i) => (
                 <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all duration-300 p-2.5">
                   <Icon className="w-full h-full" />
                 </a>
               ))}
            </div>
          </div>
          
          {/* 
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:col-span-3">
            <div>
              <h4 className="font-semibold text-slate-900 mb-6">Product</h4>
              <ul className="space-y-4">
                {['Features', 'Pricing', 'Global Coverage', 'API', 'Changelog'].map(item => (
                  <li key={item}><a href="#" className="text-slate-500 hover:text-brand-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-6">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'].map(item => (
                  <li key={item}><a href="#" className="text-slate-500 hover:text-brand-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-6">Legal</h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map(item => (
                  <li key={item}><a href="#" className="text-slate-500 hover:text-brand-600 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          */}
        </div>
        
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Zendt Financial Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
