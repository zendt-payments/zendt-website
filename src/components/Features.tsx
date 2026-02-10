import { motion } from 'framer-motion';
import { Globe, Wallet, Zap, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Globe size={24} />,
    title: "Borderless Payments",
    description: "Accept payments from 150+ countries with local bank details for major currencies.",
    accent: "group-hover:text-blue-500",
    bg: "bg-blue-50/50"
  },
  {
    icon: <Wallet size={24} />,
    title: "Multi-Currency",
    description: "Hold and convert 50+ currencies instantly with real-time mid-market rates.",
    accent: "group-hover:text-purple-500",
    bg: "bg-purple-50/50"
  },
  {
    icon: <Zap size={24} />,
    title: "Instant Transfers",
    description: "Move money between accounts instantly. No waiting days, no hidden fees.",
    accent: "group-hover:text-orange-500",
    bg: "bg-orange-50/50"
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Bank-Grade Security",
    description: "Your funds are safeguarded in regulated institutions with 2FA and encryption.",
    accent: "group-hover:text-green-500",
    bg: "bg-green-50/50"
  },
  {
    icon: <Sparkles size={24} />,
    title: "Growth Insights",
    description: "Detailed analytics on your revenue and spending habits to help you scale.",
    accent: "group-hover:text-brand-500",
    bg: "bg-brand-50/50"
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden bg-white">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-brand-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-blue-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <Sparkles size={12} className="text-brand-500" />
            Capabilities
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
          >
            A financial engine <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
              built for the future.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Everything you need to manage global payments, automate operations, and scale your business with confidence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group relative h-full"
            >
              <div className="h-full p-8 md:p-10 rounded-3xl liquid-glass hover:bg-white hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-500 flex flex-col border border-white/40">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <div className={`transition-colors duration-500 ${feature.accent.split(' ').find(c => c.startsWith('group-hover:'))?.replace('group-hover:', '') || 'text-slate-600'}`}>
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-slate-900 group-hover:text-brand-700 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-500 text-base md:text-lg leading-relaxed font-light">
                  {feature.description}
                </p>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

