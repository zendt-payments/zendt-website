import { motion } from 'framer-motion';
import { Shield, Lock, Globe, CheckCircle } from 'lucide-react';

const trustItems = [
  {
    icon: <Shield size={28} />,
    title: 'Bank-Grade Security',
    description: 'Your funds and data are protected with enterprise-level security standards.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: <CheckCircle size={28} />,
    title: 'Compliance First',
    description: 'Built in compliance with international payment regulations and standards.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: <Lock size={28} />,
    title: 'End-to-End Encryption',
    description: 'All transactions are encrypted end-to-end for complete peace of mind.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: <Globe size={28} />,
    title: 'Global Infrastructure',
    description: 'Powered by a robust global payment network trusted by thousands of users.',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
  },
];

const TrustSection = () => {
  return (
    <section id="trust" className="py-16 md:py-24 lg:py-28 relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-600/10 rounded-full blur-[100px] -z-10" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-400 text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">
            <Shield size={12} /> Built on Secure Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Built on secure global <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">
              payment infrastructure.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-5 sm:p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-500/40 hover:bg-white/[0.06] transition-all duration-500"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {item.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* RBI Compliance Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 md:mt-14 flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.03] border border-white/10 mx-auto w-fit"
        >
          <Shield size={14} className="text-brand-400 shrink-0" />
          <p className="text-slate-400 text-xs sm:text-sm">
            Banking services are offered and hosted by our RBI licensed banking partners.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
