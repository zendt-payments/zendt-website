import { motion } from 'framer-motion';
import { Shield, Globe, Zap, HeartHandshake, CheckCircle, ArrowRight, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const AboutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToPricing = () => {
    if (location.pathname === '/') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#pricing');
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <SEO 
        title="Our Story | Zendt Payments" 
        description="We're on a mission to make borders irrelevant. Zendt is the modern financial OS built by a freelancer, for freelancers."
      />


      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="pt-40 pb-20 md:pt-52 md:pb-28 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-40 -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-100/40 rounded-full blur-[120px] -z-10 mix-blend-multiply" />
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-8"
          >
            <MapPin size={14} className="text-brand-500" />
            <span className="text-sm font-semibold text-slate-500 tracking-widest uppercase">Founded 2024 · Kochi, Kerala, India</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl"
          >
            We're on a mission to make borders{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-500">
              irrelevant.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed font-light"
          >
            Built by a freelancer who got tired of watching hard-earned money disappear in fees every time an international invoice was paid. Zendt is the tool we always wished existed.
          </motion.p>
        </div>
      </section>

      {/* ── 2. THE PROBLEM ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-slate-200 bg-white">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Pull Quote */}
            <motion.div {...fadeUp}>
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-slate-800 italic">
                "I lost ₹18,000 in a single month — not because of bad clients, but because of bad infrastructure. That's when I decided to build something better."
              </p>
              <p className="mt-5 text-slate-500 text-sm font-semibold uppercase tracking-widest">— Founder, Zendt</p>
            </motion.div>

            {/* Narrative */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="space-y-5">
              <div className="pl-5 border-l-4 border-brand-500">
                <p className="text-slate-600 text-lg leading-relaxed">
                  Our founder was a freelancer working with international clients from India. Every payment cycle was a lesson in frustration — poor exchange rates, unexpected bank charges, days of waiting, and no way to predict what would actually land in the account.
                </p>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                After years of experiencing this firsthand and hearing the same story from every freelancer around, the decision was clear: build the payment platform that should have always existed. A tool built from the inside — by someone who lived the problem.
              </p>
              <p className="text-slate-700 text-lg font-semibold">
                Built by a freelancer. For every freelancer.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. BENTO GRID ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-slate-200 bg-[#f8f8fb]">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <motion.p {...fadeUp} className="text-xs font-bold uppercase tracking-[0.25em] text-brand-500 mb-10">
            What We're About
          </motion.p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-auto">

            {/* Mission — tall dark card */}
            <motion.div
              {...fadeUp}
              className="col-span-2 lg:col-span-1 row-span-2 bg-slate-900 text-white p-8 md:p-10 rounded-3xl flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <span className="text-brand-400 text-xs font-bold uppercase tracking-widest block mb-4">Our Mission</span>
                <h3 className="text-2xl md:text-3xl font-bold leading-snug">
                  Empowering Indian freelancers to earn globally.
                </h3>
              </div>
              <p className="text-slate-400 mt-6 leading-relaxed">
                No more fees eating your earnings. No more delays. No more borders standing between you and what you've worked for.
              </p>
            </motion.div>

            {/* Stat: Currencies */}
            <motion.div
              {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl flex flex-col justify-between shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Currencies</p>
              <div className="text-5xl md:text-6xl font-bold text-brand-600 leading-none">30+</div>
              <p className="text-slate-500 text-sm mt-3">supported corridors across 5 continents</p>
            </motion.div>

            {/* Stat: GCC */}
            <motion.div
              {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl flex flex-col justify-between shadow-sm"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">GCC Markets</p>
              <div className="text-5xl md:text-6xl font-bold text-brand-600 leading-none">8+</div>
              <p className="text-slate-500 text-sm mt-3">Middle East &amp; Gulf countries supported</p>
            </motion.div>

            {/* Compliance */}
            <motion.div
              {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-brand-50 border border-brand-100 p-6 md:p-8 rounded-3xl flex flex-col justify-between"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-brand-500 mb-4">Compliance</p>
              <div className="text-5xl md:text-6xl font-bold text-brand-700 leading-none">RBI</div>
              <p className="text-slate-600 text-sm mt-3">licensed banking partner network</p>
            </motion.div>

            {/* Vision — wide card */}
            <motion.div
              {...fadeUp} transition={{ duration: 0.6, delay: 0.25 }}
              className="col-span-2 bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              <div className="w-14 h-14 shrink-0 bg-brand-50 rounded-2xl flex items-center justify-center">
                <Globe size={26} className="text-brand-500" />
              </div>
              <div>
                <span className="text-brand-600 font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Our Vision</span>
                <p className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">A future without financial borders — where earning globally feels like earning locally.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 4. VALUES ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-slate-200 bg-white">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <motion.div {...fadeUp}>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">What we stand for.</h2>
              <p className="text-slate-500 mt-4 text-lg leading-relaxed">
                These aren't our marketing values. These are the principles we use to make every decision.
              </p>
            </motion.div>
            <div className="space-y-4">
              {[
                { icon: <Shield size={20} />, title: "Trust & Security", desc: "Bank-grade infrastructure that protects your money at every step.", color: "text-blue-500 bg-blue-50" },
                { icon: <Zap size={20} />, title: "Relentless Speed", desc: "Delayed payments mean delayed progress. We build everything for velocity.", color: "text-amber-500 bg-amber-50" },
                { icon: <CheckCircle size={20} />, title: "Radical Transparency", desc: "No hidden fees. No markup surprises. Every number, visible.", color: "text-green-500 bg-green-50" },
                { icon: <HeartHandshake size={20} />, title: "Customer Obsessed", desc: "We work for freelancers and agencies. Your success is our north star.", color: "text-rose-500 bg-rose-50" },
              ].map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-5 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${v.color}`}>{v.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{v.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FOUNDER'S NOTE ───────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-slate-200">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            {...fadeUp}
            className="bg-slate-900 text-white rounded-[2rem] md:rounded-[3rem] p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 rounded-full blur-[100px] -z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/15 rounded-full blur-[80px] -z-0" />
            <div className="relative z-10 max-w-3xl">
              <span className="text-brand-400 text-xs font-bold uppercase tracking-[0.25em] mb-8 block">A Note From The Founder</span>
              <p className="text-2xl md:text-3xl font-medium leading-relaxed text-white/90">
                "I was a freelancer. I invoiced clients in the US, the Gulf, Europe. I did great work, got paid on time — and still watched thousands of rupees vanish into fees, conversions, and delays every single month.
              </p>
              <p className="text-2xl md:text-3xl font-medium leading-relaxed text-white/90 mt-6">
                I was tired of accepting that as the cost of working globally. So I built Zendt — the platform I needed but could never find. Built from the inside, by someone who lived it."
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div>
                  <p className="font-bold text-white">— Alen Thomas, Founder, Zendt Payments</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <MapPin size={13} className="text-brand-400" />
                    <p className="text-slate-400 text-sm">Based in Kerala, India 🇮🇳</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 6. TIMELINE ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-slate-200 bg-[#f8f8fb]">
        <div className="container max-w-4xl mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold">How we got here.</h2>
            <p className="text-slate-500 mt-4 text-lg">The milestones that shaped Zendt.</p>
          </motion.div>

          <div className="relative border-l border-slate-300 ml-3 md:ml-0 md:border-l-0 md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:w-px md:before:bg-slate-300 md:before:-ml-px space-y-12 pb-12">
            {[
              { date: "Dec 2024", title: "Idea & Problem Discovery", desc: "Identified the challenges freelancers face with fragmented tools, delayed payments, and expensive cross-border transactions." },
              { date: "Feb 2025", title: "Initial Product Planning", desc: "Began structuring Zendt as a complete financial stack for freelancers to receive, manage, and spend global earnings." },
              { date: "Apr 2025", title: "Team Formation", desc: "The founding team came together to begin building the platform and shaping the product vision." },
              { date: "Jun 2025", title: "Pre-seed Funding Secured", desc: "Raised the initial pre-seed round to kickstart development and infrastructure partnerships." },
              { date: "Oct 2025", title: "Prototype UI Completion", desc: "Completed the first full product interface and user experience for the Zendt platform." },
              { date: "Nov 2025", title: "Payment Infrastructure Progress", desc: "Secured domestic payment rails and began integration discussions for cross-border infrastructure." },
              { date: "Dec 2025", title: "MVP Ready", desc: "Core platform infrastructure and workflows completed for early testing." },
              { date: "Jan 2026", title: "International Rails Secured", desc: "Established key partnerships enabling global collections and account-to-account payment capabilities." },
              { date: "Feb 2026", title: "Beta Development Begins", desc: "Started building the beta version of the product with live integrations and workflow testing." },
              { date: "Apr 2026", title: "Beta Release to Public", desc: "First public beta release, onboarding early users and validating the platform in real-world scenarios.", active: true },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group pl-8 md:pl-0"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full border-2 border-white ring-4 ring-white ${item.active ? 'bg-brand-600 scale-125' : 'bg-slate-300'}`} />

                {/* Content - Left side on Desktop for even, Right side for odd */}
                <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'} mb-2 md:mb-0`}>
                  <span className={`text-sm font-bold uppercase tracking-widest ${item.active ? 'text-brand-600' : 'text-slate-400'}`}>{item.date}</span>
                </div>
                
                <div className={`md:w-[45%] ${i % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:text-right md:pr-12'}`}>
                  <div className={`p-6 rounded-2xl border transition-shadow ${item.active ? 'bg-white border-brand-200 shadow-md shadow-brand-500/5' : 'bg-white/50 border-slate-200 group-hover:bg-white group-hover:shadow-sm'}`}>
                    <h4 className="text-lg font-bold mb-2 text-slate-900">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Future Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between pl-8 md:pl-0 mt-8"
            >
              <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full border-2 border-white bg-white ring-2 ring-slate-200 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-slate-300 animate-pulse" />
              </div>
              <div className="md:w-[45%] md:text-right md:pr-12 mb-2 md:mb-0">
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Next</span>
              </div>
              <div className="md:w-[45%] md:pl-12">
                <p className="text-sm leading-relaxed text-slate-500 italic">Scaling cross-border capabilities and building the infrastructure powering the next generation of global freelancers.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            {...fadeUp}
            className="bg-gradient-to-br from-brand-600 to-indigo-600 rounded-[2rem] md:rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Be the first to go borderless.</h2>
              <p className="text-brand-100 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
                Join the waitlist and get early access when we launch in April 2026. Your global payments, simplified.
              </p>
              <button
                onClick={scrollToPricing}
                className="inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:-translate-y-1 hover:shadow-white/30 transition-all active:scale-95 group"
              >
                Join the Waitlist <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
