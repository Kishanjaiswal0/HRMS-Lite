export default function CalendarWidget() {
  const today = new Date();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
      <p className="text-slate-500 text-sm mb-2">Calendar</p>

      <h3 className="serif text-xl dark:text-white">
        {today.toLocaleString("default", { month: "long" })} {today.getFullYear()}
      </h3>

      <div className="grid grid-cols-7 gap-2 mt-4 text-center text-sm">
        {["S","M","T","W","T","F","S"].map(d => (
          <span key={d} className="text-slate-400">{d}</span>
        ))}

        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate();

          return (
            <span
              key={day}
              className={`py-1 rounded-lg ${
                isToday
                  ? "bg-emerald-500 text-white"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}
