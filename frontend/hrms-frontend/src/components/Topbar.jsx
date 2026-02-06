import { useState } from "react";
import { Lock } from "lucide-react";
import ChangePasswordModal from "./ChangePasswordModal";

export default function Topbar() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="topbar flex justify-between items-center bg-white px-6 py-3 shadow-sm">
      <h3 className="font-semibold text-lg text-slate-700">HRMS Lite Admin</h3>

      <button
        onClick={() => setShowPasswordModal(true)}
        className="flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 transition-colors"
      >
        <Lock size={16} />
        Change Password
      </button>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
}
