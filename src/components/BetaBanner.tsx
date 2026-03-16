import { useEffect, useState } from 'react';
import { X, Rocket } from 'lucide-react';

const BETA_DATE = new Date('2025-04-30T00:00:00');

function getTimeLeft() {
  const now = new Date();
  const diff = BETA_DATE.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

const BetaBanner = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (dismissed || !timeLeft) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-500 text-white py-2.5 px-6 md:px-8 flex items-center justify-center gap-4 text-sm font-medium shadow-lg">
      <div className="flex items-center gap-2">
        <Rocket size={15} className="shrink-0 animate-bounce" style={{ animationDuration: '2s' }} />
        <span className="hidden sm:inline font-semibold">Beta launches end of April!</span>
        <span className="sm:hidden font-semibold">Beta launching soon!</span>
      </div>

      <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 backdrop-blur-sm font-mono text-xs font-bold tracking-wider">
        <span>{String(timeLeft.days).padStart(2, '0')}d</span>
        <span className="opacity-60">:</span>
        <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
        <span className="opacity-60">:</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
        <span className="opacity-60">:</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
      </div>

      <button
        onClick={() => window.open('https://form.typeform.com/to/NXBdfmUW', '_blank')}
        className="hidden sm:inline-flex items-center gap-1.5 bg-white text-brand-700 text-xs font-bold px-4 py-1.5 rounded-full hover:bg-brand-50 transition-colors"
      >
        Reserve your spot →
      </button>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default BetaBanner;
