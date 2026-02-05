import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar open={open} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">

        {/* Top Bar (Hamburger) */}
        <div className="h-14 flex items-center px-4 bg-white/70 backdrop-blur-md shadow-sm">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 mesh-bg">
          {children}
        </main>

      </div>
    </div>
  );
}
