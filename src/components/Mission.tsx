import { motion } from 'framer-motion';
import { Target, Eye, Sparkles } from 'lucide-react';

const Mission = () => {
  return (
    <section id="mission" className="py-16 md:py-32 lg:py-40 bg-slate-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[140px] -translate-y-1/2 -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 -z-10" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col p-6 sm:p-8 md:p-14 rounded-3xl md:rounded-[3rem] bg-white/[0.03] border border-white/10 hover:border-brand-500/50 transition-all duration-500 group gap-5 md:gap-0">
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center md:mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <Target size={24} />
            </div>
            <div className="flex-1">
              <span className="text-brand-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 md:mb-4 block">Our Mission</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-3 md:mb-8 text-white">
                Empowering Indian freelancers to earn globally.
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                Zendt helps independent professionals access global opportunities without payment barriers.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col p-6 sm:p-8 md:p-14 rounded-3xl md:rounded-[3rem] bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 transition-all duration-500 group gap-5 md:gap-0">
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center md:mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
              <Eye size={24} />
            </div>
            <div className="flex-1">
              <span className="text-indigo-400 font-bold tracking-[0.2em] text-xs uppercase mb-3 md:mb-4 block">Our Vision</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-3 md:mb-8 text-white">
                A future without financial borders.
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                We believe earning globally should be as simple as earning locally.
              </p>
            </div>
          </motion.div>
        </div>
 
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-16 sm:mt-20 flex flex-col items-center text-center">
          <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
            <Sparkles size={14} className="text-brand-400" />
            Trusted by the next generation of Indian freelancers
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
