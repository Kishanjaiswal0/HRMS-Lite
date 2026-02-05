import { useEffect, useState } from "react";
import api from "../api";

import StatCard from "../components/StatCard";
import AnalogClock from "../components/AnalogClock";
import CalendarWidget from "../components/CalendarWidget";
import UpcomingHolidayCard from "../components/UpcomingHolidayCard";

import { Users, UserCheck, UserX } from "lucide-react";

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [late, setLate] = useState(0);
  const [onDuty, setOnDuty] = useState(0);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    api.get("/employees").then(res => setTotal(res.data.length));
    api.get("/attendance/dashboard/summary").then(res => {
      setPresent(res.data.present);
      setAbsent(res.data.absent);
      setLate(res.data.late);
      setOnDuty(res.data.on_duty);
      setRecent(res.data.recent || []);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-6 space-y-10">

      {/* Greeting */}
      <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-3xl serif">
            Welcome, Admin 👋
          </h1>
          <p className="text-slate-500">
            Have a productive day
          </p>
        </div>

        <button className="bg-emerald-500 text-white px-5 py-2 rounded-xl">
          ✓ Check-In
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard label="Total Employees" value={total} icon={Users} />
        <StatCard label="Present" value={present} icon={UserCheck} />
        <StatCard label="On Duty" value={onDuty} icon={UserCheck} />
        <StatCard label="Late" value={late} icon={UserX} />
        <StatCard label="Absent" value={absent} icon={UserX} />
      </div>

      {/* Holiday Card */}
      <div className="grid grid-cols-1 gap-6">
        <UpcomingHolidayCard />
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalogClock />
        <CalendarWidget />

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-3">Recent Activity</h3>
          {recent.length === 0 ? (
            <p className="text-slate-400">No activity today</p>
          ) : (
            recent.map((r, i) => (
              <p key={i} className="text-slate-600">
                Employee #{r.employee_id} marked <b>{r.status}</b>
              </p>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
