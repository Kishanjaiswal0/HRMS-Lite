import { useEffect, useState } from "react";
import api from "../api";

export default function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    employee_id: "", // THIS WILL STORE emp.id
    date: "",
    status: "Present"
  });

  // Load employees
  useEffect(() => {
    api.get("/employees").then(res => setEmployees(res.data));
  }, []);

  // Load attendance records
  const loadAttendance = async (empId) => {
    if (!empId) return;
    const res = await api.get(`/attendance/${empId}`);
    setRecords(res.data);
  };

  // Mark attendance
  const markAttendance = async (e) => {
    e.preventDefault();

    if (!form.employee_id || !form.date) {
      alert("All fields required");
      return;
    }

    try {
      // ✅ CORRECT endpoint + correct ID (NO trailing slash)
      await api.post("/attendance", {
        employee_id: Number(form.employee_id),
        date: form.date,
        status: form.status
      });

      alert("Attendance marked");
      loadAttendance(form.employee_id);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to mark attendance");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">

      <h2 className="text-3xl serif mb-6">
        Attendance
      </h2>

      {/* MARK ATTENDANCE */}
      <div className="data-card p-6 mb-10">

        <h3 className="text-lg font-semibold mb-4">
          Mark Attendance
        </h3>

        <form
          onSubmit={markAttendance}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >

          {/* EMPLOYEE SELECT */}
          <select
            className="input"
            value={form.employee_id}
            onChange={(e) => {
              setForm({ ...form, employee_id: e.target.value });
              loadAttendance(e.target.value);
            }}
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option
                key={emp.id}
                value={emp.id}     // ✅ USE DATABASE ID
              >
                {emp.full_name} ({emp.employee_id})
              </option>
            ))}
          </select>

          {/* DATE */}
          <input
            type="date"
            className="input"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          {/* STATUS */}
          <select
            className="input"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="On Duty">On Duty</option>
          </select>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
          >
            Mark
          </button>

        </form>
      </div>

      {/* RECORDS */}
      {records.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24 text-slate-400">
          <div className="text-6xl mb-4">🕒</div>
          <p>No attendance records yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((rec, i) => (
            <div
              key={i}
              className="data-card flex items-center justify-between px-6 py-4"
            >
              <p className="font-medium">{rec.date}</p>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${rec.status === "Present"
                    ? "bg-emerald-100 text-emerald-600"
                    : rec.status === "Late"
                      ? "bg-yellow-100 text-yellow-600"
                      : rec.status === "On Duty"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                  }`}
              >
                {rec.status}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
