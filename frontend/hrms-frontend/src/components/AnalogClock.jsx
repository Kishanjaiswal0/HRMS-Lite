import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={18} className="text-emerald-500" />
        <p className="text-slate-500 text-sm">Live Clock</p>
      </div>

      <div className="relative w-48 h-48 rounded-full border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center">

        {/* Hour hand */}
        <div
          className="absolute w-1 h-14 bg-slate-800 dark:bg-white rounded"
          style={{ transform: `rotate(${hourDeg}deg) translateY(-20px)` }}
        />

        {/* Minute hand */}
        <div
          className="absolute w-1 h-20 bg-slate-600 dark:bg-slate-300 rounded"
          style={{ transform: `rotate(${minuteDeg}deg) translateY(-30px)` }}
        />

        {/* Second hand */}
        <div
          className="absolute w-0.5 h-24 bg-emerald-500 rounded origin-bottom"
          style={{ transform: `rotate(${secondDeg}deg) translateY(-40px)` }}
        />

        {/* Center dot */}
        <div className="w-3 h-3 bg-emerald-500 rounded-full z-10" />
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}
