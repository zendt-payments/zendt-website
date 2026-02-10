import { motion } from 'framer-motion';
import { Target, Eye, Sparkles } from 'lucide-react';

const Mission = () => {
  return (
    <section id="mission" className="py-40 bg-slate-950 text-white relative overflow-hidden">
      {/* Immersive Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[140px] -translate-y-1/2 -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 -z-10" />
      
      <div className="container relative z-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-row md:flex-col p-5 md:p-14 rounded-2xl md:rounded-[3rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 hover:border-brand-500/50 transition-all duration-500 group relative overflow-hidden gap-5 md:gap-0"
            >
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center md:mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Target size={24} className="md:w-8 md:h-8" />
              </div>
              
              <div className="flex-1">
                <span className="text-brand-400 font-bold tracking-[0.2em] text-[10px] uppercase mb-1 md:mb-4 block">Our Mission</span>
                <h2 className="text-xl md:text-5xl font-bold leading-tight tracking-tight mb-2 md:mb-8 text-white">
                  Empowering the global digital economy.
                </h2>
                <p className="text-sm md:text-xl text-slate-400 leading-relaxed font-light line-clamp-2 md:line-clamp-none">
                  To build the financial infrastructure that enables every individual and business to receive and manage payments seamlessly.
                </p>
              </div>
            </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-row md:flex-col p-5 md:p-14 rounded-2xl md:rounded-[3rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 hover:border-indigo-500/50 transition-all duration-500 group relative overflow-hidden gap-5 md:gap-0"
          >
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center md:mb-10 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
              <Eye size={24} className="md:w-8 md:h-8" />
            </div>
            
            <div className="flex-1">
              <span className="text-indigo-400 font-bold tracking-[0.2em] text-[10px] uppercase mb-1 md:mb-4 block">Our Vision</span>
              <h2 className="text-xl md:text-5xl font-bold leading-tight tracking-tight mb-2 md:mb-8 text-white">
                A future without financial borders.
              </h2>
              <p className="text-sm md:text-xl text-slate-400 leading-relaxed font-light line-clamp-2 md:line-clamp-none">
                To be the world’s most trusted platform for cross-border payments, enabling limitless opportunities.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Footer Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 flex flex-col items-center text-center"
        >
           <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
             <Sparkles size={14} className="text-brand-400" />
             Trusted by the next generation of global builders
           </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
