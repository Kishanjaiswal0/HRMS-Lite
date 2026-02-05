import { CalendarDays } from "lucide-react";

export default function UpcomingHolidayCard() {
  return (
    <div
      className="
        bg-gradient-to-br from-white to-slate-50
        rounded-2xl p-6 h-full
        border border-slate-100
        shadow-[0_10px_30px_rgba(0,0,0,0.04)]
        transition-transform duration-300
        hover:scale-[1.02]
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 text-slate-600 text-sm mb-4">
        <CalendarDays
          size={18}
          className="text-emerald-500 animate-[float_3s_ease-in-out_infinite]"
        />
        <span className="font-medium">Upcoming Holidays</span>
      </div>

      {/* Main Holiday */}
      <div className="text-center mt-6">
        <h3 className="serif text-xl text-slate-800">
          Maha Shivaratri
        </h3>
        <p className="text-emerald-600 font-medium mt-1">
          Sunday, Feb 15
        </p>
      </div>

      {/* Next */}
      <div className="mt-6 text-xs text-slate-500 text-center">
        Next: Holi • March 4
      </div>
    </div>
  );
}
