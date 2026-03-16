import { motion } from 'framer-motion';

const currencies = ['AED', 'SAR', 'QAR', 'OMR', 'BHD', 'KWD'];
const countries = [
  { flag: '🇦🇪', name: 'UAE' },
  { flag: '🇸🇦', name: 'Saudi Arabia' },
  { flag: '🇶🇦', name: 'Qatar' },
  { flag: '🇰🇼', name: 'Kuwait' },
  { flag: '🇴🇲', name: 'Oman' },
  { flag: '🇧🇭', name: 'Bahrain' },
];

const GCCSection = () => {
  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[120px] -z-10" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          🌙 Middle East Coverage
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
        >
          Receive payments from <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            the Middle East.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Freelancers working with clients in UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain can receive payments smoothly with Zendt.
        </motion.p>

        {/* Country flags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {countries.map(({ flag, name }) => (
            <div key={name} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all">
              <span className="text-xl">{flag}</span>
              <span className="text-white font-medium text-sm">{name}</span>
            </div>
          ))}
        </motion.div>

        {/* Currency pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <span className="text-slate-500 text-sm font-medium self-center">Currencies supported:</span>
          {currencies.map((c) => (
            <span key={c} className="px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold text-sm tracking-wider">
              {c}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GCCSection;
