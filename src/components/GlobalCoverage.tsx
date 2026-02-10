import { MapPin, Globe } from "lucide-react";
import { WorldMap } from "./ui/WorldMap";

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

const regions = [
  "India",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "United Kingdom",
  "United States",
  "Singapore",
];

const GlobalCoverage = () => {
  return (
    <section
      id="global"
      className="relative overflow-hidden py-28
      bg-gradient-to-br from-indigo-50 via-white to-violet-50"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-violet-300/20 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-left max-w-xl">
            
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6
              bg-emerald-50 text-emerald-700
              border border-emerald-100 rounded-full text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live coverage expanding globally
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight leading-tight">
              Built for{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                freelancers
              </span>
              <br />
              working across borders.
            </h2>

            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              We are expanding rapidly to ensure you can work with clients
              anywhere in the world.{" "}
              <span className="text-slate-900 font-medium">
                Start local, go global.
              </span>
            </p>

            {/* Regions */}
            <div className="flex flex-wrap gap-3 mb-10">
              {regions.map((region, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2
                  bg-white/70 backdrop-blur rounded-full
                  border border-slate-200
                  hover:-translate-y-0.5 hover:shadow-md
                  hover:border-indigo-300 transition-all duration-200
                  cursor-default group"
                >
                  <MapPin
                    size={14}
                    className="text-slate-400 group-hover:text-indigo-500 transition-colors"
                  />
                  <span className="font-medium text-sm text-slate-700 group-hover:text-slate-900">
                    {region}
                  </span>
                </div>
              ))}

              <div className="flex items-center gap-2 px-4 py-2
                bg-indigo-50 text-indigo-700
                rounded-full border border-indigo-100
                font-semibold text-sm">
                <Globe size={14} />
                + More
              </div>
            </div>

            {/* Expansion path */}
            <div className="flex items-center gap-4 text-sm font-semibold text-slate-700">
              <span className="px-3 py-1 rounded-full bg-slate-100">
                India
              </span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1 rounded-full bg-slate-100">
                GCC
              </span>
              <span className="text-slate-400">→</span>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                Global
              </span>
            </div>
          </div>

          {/* RIGHT: WORLD MAP */}
          <div className="relative w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
            <div
              className="w-full lg:w-[140%] lg:-mr-[20%]
              p-6 sm:p-10
              bg-white/60 backdrop-blur-xl
              rounded-[2rem]
              border border-slate-200
              animate-[float_6s_ease-in-out_infinite]"
            >
              <WorldMap dots={mapDots} lineColor="#4f46e5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalCoverage;
