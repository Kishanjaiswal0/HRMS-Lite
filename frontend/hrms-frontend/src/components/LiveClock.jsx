import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm flex flex-col items-center">
      <p className="text-slate-500 text-sm">Current Time</p>
      <h2 className="serif text-4xl mt-2 dark:text-white">
        {time.toLocaleTimeString()}
      </h2>
      <p className="text-slate-400 text-xs mt-1">
        {time.toDateString()}
      </p>
    </div>
  );
}
