import { ArrowRight, Globe2, ShieldCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-bg -z-10" />
      
      {/* Decorative Blur Elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] rounded-full bg-brand-200/50 blur-3xl opacity-60 mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] rounded-full bg-blue-100/60 blur-3xl opacity-60 mix-blend-multiply" />

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center">
        <div className="space-y-8 animate-fade-in-up z-10 text-center lg:text-left">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-brand-100 shadow-sm text-brand-700 text-sm font-semibold">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2 animate-pulse"></span>
            The Future of Freelance Finance
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Global payments, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
              reimagined.
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed text-balance">
            Receive international payments, manage multiple currencies, and spend globally without borders. 
            <span className="text-slate-900 font-medium"> Simple. Transparent. Secure.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-brand-600 text-white text-base md:text-lg font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full shadow-xl shadow-brand-600/30 hover:bg-brand-700 hover:shadow-brand-600/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white text-slate-700 border border-slate-200 text-base md:text-lg font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center justify-center gap-2">
              <Globe2 size={20} className="text-brand-500" /> View Coverage
            </button>
          </div>
          
          <div className="pt-8 flex items-center gap-6 text-sm text-slate-500 font-medium">
             <div className="flex items-center gap-2">
               <ShieldCheck className="text-green-500" size={18} /> Bank-grade security
             </div>
          </div>
        </div>
        
        <div className="relative perspective-1000 group">
          {/* Main Card UI */}
          <div className="relative z-10 liquid-glass rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 rotate-y-12 hover:rotate-0 transition-all duration-700 ease-out preserve-3d">
            <div className="flex justify-between items-start mb-10">
               <div>
                 <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Balance</p>
                 <h3 className="text-4xl font-bold text-slate-900 tracking-tight">₹2,45,000.00</h3>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600">
                 <Globe2 size={24} />
               </div>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Upwork Inc.', amount: '+₹3,200.00', time: '2 mins ago', icon: 'bg-green-100 text-green-600' },
                { label: 'Figma Subscription', amount: '-₹1,500.00', time: '1 hr ago', icon: 'bg-red-100 text-red-600' },
                { label: 'Client Transfer', amount: '+₹1,85,500.00', time: 'Yesterday', icon: 'bg-green-100 text-green-600' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 md:p-4 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-all cursor-default group/item">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${item.icon} flex items-center justify-center text-xs font-bold transition-transform group-hover/item:scale-110`}>
                      {item.amount.startsWith('+') ? '↓' : '↑'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.time}</p>
                    </div>
                  </div>
                  <span className={`font-mono font-medium ${item.amount.startsWith('+') ? 'text-green-600' : 'text-slate-900'}`}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
            
             <div className="mt-8 grid grid-cols-2 gap-4">
                <button className="py-3 px-4 bg-slate-900 text-white rounded-xl font-medium text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95">Send Money</button>
                <button className="py-3 px-4 bg-white/40 backdrop-blur-md border border-white/50 text-slate-700 rounded-xl font-medium text-sm hover:bg-white/60 transition-all shadow-sm active:scale-95">Exchange</button>
             </div>
          </div>
          
          {/* Floating Cards */}
          <div className="absolute top-[20%] -right-12 z-20 liquid-glass p-5 rounded-3xl animate-float shadow-2xl hidden md:block border-white/40">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shadow-inner">🇮🇳</div>
                <div><p className="text-[10px] font-bold text-slate-400 tracking-wider">INR ACCOUNT</p> <p className="text-base font-bold text-slate-900">₹1,24,050</p></div>
             </div>
          </div>
          
          <div className="absolute bottom-[20%] -left-12 z-20 liquid-glass p-5 rounded-3xl animate-float shadow-2xl hidden md:block border-white/40" style={{ animationDelay: '2s' }}>
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-xl shadow-inner">🇶🇦</div>
                <div><p className="text-[10px] font-bold text-slate-400 tracking-wider">QAR ACCOUNT</p> <p className="text-base font-bold text-slate-900">QR 42,420</p></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
