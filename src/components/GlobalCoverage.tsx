import { MapPin, Globe } from 'lucide-react';
import { WorldMap } from './ui/WorldMap';

const mapDots = [
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 40.7128, lng: -74.0060, label: "New York" },
  },
  {
    start: { lat: 51.5074, lng: -0.1278, label: "London" },
    end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
  },
  {
    start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
    end: { lat: 20.5937, lng: 78.9629, label: "India" },
  },
  {
    start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
    end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
  },
  {
    start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  },
  {
    start: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  },
  {
    start: { lat: 40.7128, lng: -74.0060, label: "New York" },
    end: { lat: -23.5505, lng: -46.6333, label: "Sao Paulo" },
  },
];

const GlobalCoverage = () => {
  return (
    <section id="global" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="text-left relative z-10">
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight leading-tight">
              Built for <span className="text-brand-600">freelancers</span> <br /> working across borders.
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-xl">
              We are expanding rapidly to ensure you can work with clients anywhere. <span className="text-slate-900 font-medium">Start local, go global.</span>
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {['India', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'United Kingdom', 'United States', 'Singapore'].map((region, idx) => (
                 <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 hover:border-brand-200 hover:bg-white hover:text-brand-700 transition-colors cursor-default group">
                   <MapPin size={14} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                   <span className="font-medium text-sm text-slate-700 group-hover:text-brand-900">{region}</span>
                 </div>
              ))}
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-700 rounded-full border border-brand-100 font-semibold text-sm">
                <Globe size={14} /> + More
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm font-semibold text-slate-900 opacity-60">
               <span className="flex items-center gap-2">India <span className="text-slate-300">→</span></span>
               <span className="flex items-center gap-2">GCC <span className="text-slate-300">→</span></span>
               <span className="text-brand-600 opacity-100">Global</span>
            </div>
          </div>

          {/* Right Column: Animated World Map */}
          <div className="relative w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
             <div className="w-full sm:w-[110%] lg:w-[140%] lg:-mr-[20%] p-4 sm:p-8 bg-slate-50/50 rounded-3xl border border-slate-100 shadow-sm backdrop-blur-sm">
                <WorldMap dots={mapDots} lineColor="#4f46e5" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalCoverage;
