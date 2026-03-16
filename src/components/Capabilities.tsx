import { motion } from 'framer-motion';
import { TrendingDown, Globe, Users, Zap, Sparkles } from 'lucide-react';

const items = [
  { icon: <TrendingDown size={24} />, title: "Lower FX Fees", description: "Keep more of your earnings with transparent currency conversion. No hidden markups.", tag: "Save More", color: "text-green-600", bg: "bg-green-50" },
  { icon: <Globe size={24} />, title: "Global Coverage", description: "Accept payments from major markets including US, UK, EU, and GCC.", tag: "Global", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: <Users size={24} />, title: "Built for Freelancers", description: "Designed specifically for Indian freelancers working with global clients.", tag: "India First", color: "text-brand-600", bg: "bg-brand-50" },
  { icon: <Zap size={24} />, title: "Simple & Fast", description: "No complicated setup. Start receiving payments in minutes.", tag: "Fast", color: "text-purple-600", bg: "bg-purple-50" },
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-white">
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-brand-50/40 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-1/4 h-1/2 bg-blue-50/40 rounded-full blur-[100px] -z-10" />

      <div className="container relative z-10">
        <div className="max-w-2xl mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100/50 text-brand-700 text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">
            <Sparkles size={12} /> Why Zendt
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Why freelancers <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500">choose Zendt.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {items.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -10 }} className="group h-full">
              <div className="h-full p-6 sm:p-8 rounded-2xl md:rounded-[2rem] liquid-glass hover:border-brand-300 transition-all duration-500 flex flex-col bg-white/40">
                <div className="w-full flex justify-between items-start mb-6 md:mb-10">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {item.icon}
                  </div>
                  <span className="hidden md:block text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-100 text-slate-500 uppercase tracking-wider">{item.tag}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 text-slate-900 group-hover:text-brand-700 transition-colors">{item.title}</h3>
                <p className="text-slate-600 text-[13px] sm:text-sm md:text-base leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
