import { ArrowRight, ChevronDown, Globe2, Download, Layers, CreditCard } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-44 pb-20 md:pt-40 md:pb-28 lg:pt-[240px] lg:pb-[160px] overflow-hidden">
      <div className="absolute inset-0 mesh-bg -z-10" />
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] rounded-full bg-brand-200/50 blur-3xl opacity-60 mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] rounded-full bg-blue-100/60 blur-3xl opacity-60 mix-blend-multiply" />

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up z-10 text-center lg:text-left">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Get paid globally.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
              Without losing money on fees.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Zendt provides every facility a freelancer needs for international payments. Receive funds globally, manage multiple currencies, and run your freelance business seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-brand-600 text-white text-base md:text-lg font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-xl shadow-brand-600/30 hover:bg-brand-700 hover:shadow-brand-600/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Join Early Access <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 text-base md:text-lg font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ChevronDown size={20} className="text-brand-500" /> See How It Works
            </button>
          </div>

          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-sm text-slate-500 font-medium">Launching April 2026</p>
          </div>
        </div>

        <div className="relative perspective-1000 group">
          <div className="relative z-10 liquid-glass rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-10 rotate-y-12 hover:rotate-0 transition-all duration-700 ease-out preserve-3d">
            <div className="flex justify-between items-start mb-6 md:mb-10">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Balance</p>
                <h3 className="text-4xl font-bold text-slate-900 tracking-tight">₹2,43,816.00</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600">
                <Globe2 size={24} />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Emily Carter', sub: 'Invoice #INV-402', amount: '+$2,450.00', icon: 'bg-green-100 text-green-600' },
                { label: 'Daniel Schmidt', sub: 'Invoice #INV-389', amount: '+€1,200.00', icon: 'bg-green-100 text-green-600' },
                { label: 'Aisha Khan', sub: 'Invoice #INV-374', amount: '+AED 3,200', icon: 'bg-green-100 text-green-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 sm:p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-all cursor-default group/item">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${item.icon} flex items-center justify-center text-xs font-bold`}>
                      ↓
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-green-600">{item.amount}</span>
                </div>
              ))}
            </div>

            {/* Action Boxes */}
            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/60 transition-all cursor-default">
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center">
                  <Download size={16} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-700">Receive</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 hover:bg-white/60 transition-all cursor-default">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Layers size={16} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-700">Manage</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 hover:bg-slate-800 transition-all cursor-default">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
                  <CreditCard size={16} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-white">Spend</span>
              </div>
            </div>
          </div>
          <div className="absolute top-[20%] -right-12 z-20 liquid-glass p-5 rounded-3xl animate-float shadow-2xl hidden md:block border-white/40">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">🇺🇸</div>
              <div><p className="text-[10px] font-bold text-slate-400 tracking-wider">USD ACCOUNT</p><p className="text-base font-bold text-slate-900">$1,800.00</p></div>
            </div>
          </div>
          <div className="absolute bottom-[20%] -left-12 z-20 liquid-glass p-5 rounded-3xl animate-float shadow-2xl hidden md:block border-white/40" style={{ animationDelay: '2s' }}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-xl">🇦🇪</div>
              <div><p className="text-[10px] font-bold text-slate-400 tracking-wider">AED ACCOUNT</p><p className="text-base font-bold text-slate-900">AED 4,000.00</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
