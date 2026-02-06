import { useState } from "react";
import { Lock, X } from "lucide-react";
import api from "../api";

export default function ChangePasswordModal({ onClose }) {
    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
        confirm_password: ""
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    const customHandleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const customSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (formData.new_password !== formData.confirm_password) {
            setMessage({ type: "error", text: "New passwords do not match" });
            return;
        }

        if (formData.new_password.length < 8) {
            setMessage({ type: "error", text: "Password must be at least 8 characters" });
            return;
        }

        try {
            await api.put("/auth/change-password", {
                old_password: formData.old_password,
                new_password: formData.new_password
            });
            setMessage({ type: "success", text: "Password changed successfully" });
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            setMessage({ type: "error", text: err.response?.data?.detail || "Failed to change password" });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Lock size={20} />
                    Change Password
                </h2>

                {message.text && (
                    <div className={`p-2 mb-4 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={customSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                        <input
                            type="password"
                            name="old_password"
                            value={formData.old_password}
                            onChange={customHandleChange}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            name="new_password"
                            value={formData.new_password}
                            onChange={customHandleChange}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={customHandleChange}
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-emerald-500 outline-none"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                        >
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
