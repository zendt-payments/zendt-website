import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Wallet, FileText, Globe, IndianRupee, ChevronRight } from 'lucide-react';

const steps = [
  { icon: <UserPlus size={28} />, title: "Create your account", desc: "Sign up and complete quick verification.", color: "bg-blue-50 text-blue-600" },
  { icon: <Wallet size={28} />, title: "Get global accounts", desc: "Get receiving accounts in supported currencies.", color: "bg-purple-50 text-purple-600" },
  { icon: <FileText size={28} />, title: "Send invoice or link", desc: "Share payment details with your client.", color: "bg-green-50 text-green-600" },
  { icon: <Globe size={28} />, title: "Receive funds", desc: "Receive funds from clients worldwide.", color: "bg-orange-50 text-orange-600" },
  { icon: <IndianRupee size={28} />, title: "Withdraw to INR", desc: "Withdraw your earnings to your Indian bank account.", color: "bg-brand-50 text-brand-600" },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50/50 rounded-full blur-3xl -mr-20 -mt-20 opacity-60 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -ml-20 -mb-20 opacity-60 -z-10" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">
            How It Works
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-slate-900 tracking-tight">
            Get started in minutes.<br />
            <span className="text-brand-600">Global payments made easy.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-slate-500 text-base md:text-lg leading-relaxed px-4">
            Simple onboarding. No complex setup required.
          </motion.p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {steps.map((step, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, scale: 0.95, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="relative group">
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-6 z-20 translate-x-1/2">
                  <ChevronRight className="text-slate-200 group-hover:text-brand-300 transition-colors" />
                </div>
              )}
              <div className="h-full p-4 sm:p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] bg-slate-50/50 border border-slate-100 hover:border-brand-200 hover:bg-white hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-4 sm:gap-5 md:gap-0">
                <div className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${step.color} flex items-center justify-center md:mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {React.cloneElement(step.icon as React.ReactElement, { size: 24 } as any)}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-brand-600/50 uppercase tracking-[0.2em]">Step {idx + 1}</span>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-900 mt-0.5 mb-1 md:mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-[11px] sm:text-xs md:text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl liquid-glass border-white/60 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">✓</div>
            <div>
              <p className="font-bold text-slate-900 text-base sm:text-lg">Start receiving payments today</p>
              <p className="text-slate-500 text-sm sm:text-base">No complex setup required.</p>
            </div>
          </div>
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })} className="w-full md:w-auto bg-brand-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-xl shadow-brand-600/20 hover:bg-brand-700 hover:-translate-y-1 transition-all active:scale-95 text-sm sm:text-base">
            Join Early Access →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
