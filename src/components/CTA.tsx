import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden bg-white">
      {/* Immersive Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-100/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] -z-10" />

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2rem] md:rounded-[4rem] p-6 sm:p-16 md:p-20 overflow-hidden text-center liquid-glass shadow-2xl"
        >
          {/* Internal Glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 blur-[80px] rounded-full translate-x-1/4 -translate-y-1/4 -z-10" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[80px] rounded-full -translate-x-1/4 translate-y-1/4 -z-10" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/80 text-brand-700 text-xs font-bold uppercase tracking-widest mb-10 backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-brand-500" />
              Join the evolution
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-8 text-slate-900 tracking-tight leading-[1.1]"
            >
              Your global payments, <br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500">
                simplified forever.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-slate-600 mb-14 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Building the global business of the future on Zendt. <br className="hidden md:block" /> Secure. Transparent. Borderless.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="max-w-xl mx-auto"
            >
              <form className="flex flex-col sm:flex-row gap-4 relative" onSubmit={(e) => e.preventDefault()}>
                <div className="flex-1 relative">
                  <input 
                    type="email" 
                    placeholder="Enter your work email" 
                    className="w-full px-8 py-5 rounded-3xl text-slate-950 bg-white/80 border border-slate-200 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400 font-medium"
                  />
                </div>
                <button className="bg-brand-600 text-white font-bold px-10 py-5 rounded-3xl hover:bg-brand-700 transition-all shadow-xl shadow-brand-600/20 hover:shadow-brand-600/40 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group whitespace-nowrap">
                  Early Access <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              
              <p className="mt-8 text-sm text-slate-400 font-medium">
                No credit card required. Invite-only access starting soon.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
