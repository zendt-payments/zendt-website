import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Mail, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbx26RgRiHUFNr7iG5CSh8tiYwe2nQU0a-ZSgD3h7YfWitGfbOg20kY5r09ZrrppUvD9xw/exec';

const CTA = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = SHEET_URL;
    form.target = 'hidden_iframe';
    form.style.display = 'none';
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'email';
    input.value = email;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    setTimeout(() => { document.body.removeChild(form); document.body.removeChild(iframe); }, 3000);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-100/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] -z-10" />

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-[2rem] md:rounded-[4rem] p-6 sm:p-10 md:p-16 lg:p-20 overflow-hidden text-center liquid-glass shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 blur-[80px] rounded-full translate-x-1/4 -translate-y-1/4 -z-10" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[80px] rounded-full -translate-x-1/4 translate-y-1/4 -z-10" />
 
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/80 text-brand-700 text-xs font-bold uppercase tracking-widest mb-6 sm:mb-10 backdrop-blur-sm">
              <Sparkles size={14} className="text-brand-500" /> Launching April 2026
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-slate-900 tracking-tight leading-[1.1]">
              Start accepting global <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500">payments today.</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-base sm:text-lg md:text-xl text-slate-600 mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed font-light px-2 sm:px-0">
              Join the early users of Zendt and simplify how you receive international payments.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder={submitted ? "✓ You're on the list!" : 'Enter your email'}
                  className="w-full sm:flex-1 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl md:rounded-3xl bg-white/80 border border-slate-200 text-slate-950 placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all font-medium text-sm sm:text-base"
                />
                <button onClick={handleSubmit} className="w-full sm:w-auto bg-brand-600 text-white font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl md:rounded-3xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 hover:shadow-brand-600/40 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group whitespace-nowrap text-sm sm:text-base">
                  {submitted ? 'See you soon! 🎉' : <><span>Join Early Access</span><ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <a href="#features" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 hover:text-brand-600 transition-colors font-medium">
                  <ExternalLink size={15} /> Explore Platform
                </a>
                <span className="hidden sm:inline text-slate-200">|</span>
                <a href="mailto:contact@zendtpayments.com" className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-brand-600 transition-colors font-medium">
                  <Mail size={15} /> contact@zendtpayments.com
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
