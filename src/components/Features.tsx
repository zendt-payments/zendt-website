import { motion } from 'framer-motion';
import { Globe, Wallet, RefreshCw, FileText, Link, IndianRupee, Sparkles } from 'lucide-react';

const features = [
  { icon: <Globe size={24} />, title: "Global Receiving Accounts", description: "Receive international payments using global account details.", bg: "bg-blue-50/50", color: "text-blue-500" },
  { icon: <Wallet size={24} />, title: "Multi-Currency Wallet", description: "Hold and manage balances across multiple currencies.", bg: "bg-purple-50/50", color: "text-purple-500" },
  { icon: <RefreshCw size={24} />, title: "Smart Currency Conversion", description: "Convert currencies with transparent exchange rates.", bg: "bg-teal-50/50", color: "text-teal-500" },
  { icon: <FileText size={24} />, title: "Professional Invoicing", description: "Create and send invoices to clients worldwide.", bg: "bg-orange-50/50", color: "text-orange-500" },
  { icon: <Link size={24} />, title: "Payment Links", description: "Accept payments instantly through shareable payment links.", bg: "bg-green-50/50", color: "text-green-500" },
  { icon: <IndianRupee size={24} />, title: "Fast INR Withdrawals", description: "Transfer your earnings to your local bank account easily.", bg: "bg-brand-50/50", color: "text-brand-500" },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-white">
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-brand-100/30 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-blue-100/30 rounded-full blur-[100px] -z-10" />

      <div className="container relative z-10">
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 shadow-sm">
            <Sparkles size={12} className="text-brand-500" /> Features
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-4 sm:mb-6">
            Everything you need to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">get paid globally.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed">
            A comprehensive payment solution providing every facility an independent freelancer needs to work globally.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="group h-full">
              <div className="h-full p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl liquid-glass hover:bg-white hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 flex flex-col border border-white/40">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-6 sm:mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {f.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 text-slate-900 group-hover:text-brand-700 transition-colors">{f.title}</h3>
                <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed font-light">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
