import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Clock,
  LogOut
} from "lucide-react";

export default function Sidebar({ open }) {
  const { logout } = useAuth();

  return (
    <aside
      className={`h-full bg-[#121212]/90 backdrop-blur-lg text-slate-300
      transition-all duration-300
      ${open ? "w-[260px]" : "w-0"}
      overflow-hidden flex flex-col`}
    >

      {/* Logo */}
      <div className="px-6 py-5 text-white serif text-xl">
        HRMS Lite
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/employees" icon={Users} label="Employees" />
        <NavItem to="/attendance" icon={Clock} label="Attendance" />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div>
            <p className="text-sm text-white">Admin</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>

        <button onClick={logout} title="Logout">
          <LogOut size={18} className="text-slate-400 hover:text-red-400 cursor-pointer transition-colors" />
        </button>
      </div>
    </aside>
  );
}

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm
         transition-all relative
         ${isActive
          ? "text-emerald-400 bg-emerald-500/10"
          : "hover:bg-white/10 text-slate-300"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-0 h-full w-1 bg-emerald-500 rounded-r" />
          )}
          <Icon size={18} />
          {label}
        </>
      )}
    </NavLink>
  );
}
