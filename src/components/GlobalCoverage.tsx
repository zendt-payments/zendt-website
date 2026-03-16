import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

const initialCurrencies = ['USD', 'EUR', 'GBP', 'AED', 'SAR', 'QAR', 'KWD', 'OMR', 'BHD', 'INR', 'SGD', 'AUD'];

const extraCurrencies = [
  'CAD', 'HKD', 'JPY', 'CHF', 'SEK', 'NOK', 'DKK',
  'NZD', 'ZAR', 'MYR', 'THB', 'PHP', 'CNY', 'KRW',
  'IDR', 'TRY', 'MXN', 'BRL', 'PLN', 'CZK', 'HUF',
];

// Payment flow routes: India as hub connecting to all currency regions
// core = true for default currencies (brighter), false for extra currencies (subtler)
const mapConnections = [
  // ── Core currencies (shown by default) ──
  { end: { lat: 40.7, lng: -74.0 },   core: true },   // USD – US (New York)
  { end: { lat: 50.1, lng: 8.7 },     core: true },   // EUR – Germany (Frankfurt)
  { end: { lat: 51.5, lng: -0.1 },    core: true },   // GBP – UK (London)
  { end: { lat: 25.2, lng: 55.3 },    core: true },   // AED – UAE (Dubai)
  { end: { lat: 24.7, lng: 46.7 },    core: true },   // SAR – Saudi Arabia (Riyadh)
  { end: { lat: 25.3, lng: 51.5 },    core: true },   // QAR – Qatar (Doha)
  { end: { lat: 29.4, lng: 47.9 },    core: true },   // KWD – Kuwait
  { end: { lat: 23.6, lng: 58.5 },    core: true },   // OMR – Oman (Muscat)
  { end: { lat: 26.2, lng: 50.6 },    core: true },   // BHD – Bahrain (Manama)
  { end: { lat: 1.35, lng: 103.8 },   core: true },   // SGD – Singapore
  { end: { lat: -33.8, lng: 151.2 },  core: true },   // AUD – Australia (Sydney)

  // ── Extra currencies (Show More) ──
  { end: { lat: 43.65, lng: -79.4 },  core: false },  // CAD – Canada (Toronto)
  { end: { lat: 22.3, lng: 114.2 },   core: false },  // HKD – Hong Kong
  { end: { lat: 35.7, lng: 139.7 },   core: false },  // JPY – Japan (Tokyo)
  { end: { lat: 47.4, lng: 8.5 },     core: false },  // CHF – Switzerland (Zurich)
  { end: { lat: 59.3, lng: 18.1 },    core: false },  // SEK – Sweden (Stockholm)
  { end: { lat: 59.9, lng: 10.7 },    core: false },  // NOK – Norway (Oslo)
  { end: { lat: 55.7, lng: 12.6 },    core: false },  // DKK – Denmark (Copenhagen)
  { end: { lat: -36.8, lng: 174.8 },  core: false },  // NZD – New Zealand (Auckland)
  { end: { lat: -26.2, lng: 28.0 },   core: false },  // ZAR – South Africa (Johannesburg)
  { end: { lat: 3.1, lng: 101.7 },    core: false },  // MYR – Malaysia (KL)
  { end: { lat: 13.75, lng: 100.5 },  core: false },  // THB – Thailand (Bangkok)
  { end: { lat: 14.6, lng: 121.0 },   core: false },  // PHP – Philippines (Manila)
  { end: { lat: 31.2, lng: 121.5 },   core: false },  // CNY – China (Shanghai)
  { end: { lat: 37.6, lng: 127.0 },   core: false },  // KRW – South Korea (Seoul)
  { end: { lat: -6.2, lng: 106.8 },   core: false },  // IDR – Indonesia (Jakarta)
  { end: { lat: 41.0, lng: 29.0 },    core: false },  // TRY – Turkey (Istanbul)
  { end: { lat: 19.4, lng: -99.1 },   core: false },  // MXN – Mexico (Mexico City)
  { end: { lat: -23.5, lng: -46.6 },  core: false },  // BRL – Brazil (São Paulo)
  { end: { lat: 52.2, lng: 21.0 },    core: false },  // PLN – Poland (Warsaw)
  { end: { lat: 50.1, lng: 14.4 },    core: false },  // CZK – Czech Republic (Prague)
  { end: { lat: 47.5, lng: 19.0 },    core: false },  // HUF – Hungary (Budapest)
];

const INDIA = { lat: 10.0, lng: 76.3 };


// Projection for world.svg (2000x857)
const project = (lat: number, lng: number) => {
  const x = (lng + 180) * (2000 / 360);
  const y = (90 - lat) * (857 / 180) + 45;
  return { x, y };
};

const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 60;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

const GlobalCoverage = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="global" className="py-16 md:py-24 lg:py-28 relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          Global Coverage
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
        >
          Receive payments from clients <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">
            anywhere in the world.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-2"
        >
          Zendt enables freelancers to accept payments from clients globally while managing multiple currencies in one place.
        </motion.p>

        {/* World Map Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative w-full max-w-5xl mx-auto mb-12 px-4"
        >
          <div className="relative w-full aspect-[2000/857] overflow-visible">
            <svg
              viewBox="0 0 2000 857"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* World map – inverted for dark bg */}
              <image
                href="/world.svg"
                width="2000"
                height="857"
                className="opacity-[0.12]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />

              {/* Dotted overlay masked to land */}
              <defs>
                <pattern
                  id="dark-dots"
                  x="0"
                  y="0"
                  width="12"
                  height="12"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="#7c3aed" opacity="0.35" />
                </pattern>
              </defs>
              <mask id="dark-world-mask">
                <image href="/world.svg" width="2000" height="857" style={{ filter: 'brightness(0) invert(1)' }} />
              </mask>
              <rect width="2000" height="857" fill="url(#dark-dots)" mask="url(#dark-world-mask)" className="opacity-50" />

              {/* Connection paths */}
              {mapConnections.map((conn, i) => {
                const start = project(INDIA.lat, INDIA.lng);
                const end = project(conn.end.lat, conn.end.lng);
                const path = createCurvedPath(start, end);
                const strokeW = conn.core ? 2 : 1.2;
                const glowW = conn.core ? 3.5 : 2;
                const baseOpacity = conn.core ? 0.35 : 0.15;

                return (
                  <g key={`flow-${i}`}>
                    <defs>
                      <linearGradient id={`dark-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                        <stop offset="50%" stopColor={conn.core ? '#7c3aed' : '#818cf8'} stopOpacity={conn.core ? 0.7 : 0.4} />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Static path */}
                    <motion.path
                      d={path}
                      stroke={conn.core ? '#7c3aed' : '#818cf8'}
                      strokeWidth={strokeW}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: baseOpacity }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.08 }}
                    />
                    {/* Animated flowing path */}
                    <motion.path
                      d={path}
                      stroke={`url(#dark-grad-${i})`}
                      strokeWidth={glowW}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
                      transition={{
                        duration: conn.core ? 2.8 : 3.5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: i * 0.2,
                      }}
                    />
                  </g>
                );
              })}

              {/* India hub node (drawn once) */}
              {(() => {
                const hub = project(INDIA.lat, INDIA.lng);
                return (
                  <g>
                    <circle cx={hub.x} cy={hub.y} r="10" fill="#7c3aed" opacity="0.6" />
                    <motion.circle
                      cx={hub.x}
                      cy={hub.y}
                      r="10"
                      stroke="#7c3aed"
                      strokeWidth="3"
                      fill="none"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    />
                  </g>
                );
              })()}

              {/* Destination nodes */}
              {mapConnections.map((conn, i) => {
                const end = project(conn.end.lat, conn.end.lng);
                const r = conn.core ? 5 : 3;

                return (
                  <g key={`nodes-${i}`}>
                    <circle cx={end.x} cy={end.y} r={r} fill={conn.core ? '#818cf8' : '#a78bfa'} opacity={conn.core ? 0.5 : 0.3} />
                    <motion.circle
                      cx={end.x}
                      cy={end.y}
                      r={r}
                      stroke={conn.core ? '#818cf8' : '#a78bfa'}
                      strokeWidth={conn.core ? 2 : 1.5}
                      fill="none"
                      initial={{ scale: 1, opacity: conn.core ? 0.6 : 0.3 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15, ease: 'easeOut' }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>

        {/* Currencies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-6 px-2"
        >
          <p className="text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-5">Currencies Supported</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {initialCurrencies.map((c) => (
              <span key={c} className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 font-bold text-xs sm:text-sm tracking-wider">
                {c}
              </span>
            ))}

          </div>

          {/* Expanded currencies */}
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                key="extra-currencies"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-3">
                  {extraCurrencies.map((c, i) => (
                    <motion.span
                      key={c}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.025, duration: 0.25 }}
                      className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold text-xs sm:text-sm tracking-wider"
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle button */}
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-brand-400 font-semibold text-xs sm:text-sm tracking-wide hover:bg-white/10 hover:border-brand-500/30 transition-all duration-300 cursor-pointer group"
          >
            {showAll ? (
              <>
                <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                + {extraCurrencies.length} More Currencies
              </>
            )}
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-slate-500 text-sm mt-12"
        >
          <ShieldCheck size={16} className="text-brand-400" />
          Global payment infrastructure designed for modern freelancers.
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalCoverage;


