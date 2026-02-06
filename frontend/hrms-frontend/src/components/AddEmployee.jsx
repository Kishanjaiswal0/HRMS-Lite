import { useState } from "react";
import api from "../api";

export default function AddEmployee() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setMessage({ type: "", text: "" });
    try {
      await api.post("/employees", form);
      setMessage({ type: "success", text: "Employee added successfully!" });
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setMessage({ type: "error", text: err.response.data.detail });
      } else {
        setMessage({ type: "error", text: "Error adding employee" });
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-bold mb-3">Add Employee</h3>

      {message.text && (
        <div className={`p-2 mb-3 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message.text}
        </div>
      )}

      <input
        name="employee_id"
        value={form.employee_id}
        placeholder="Employee ID"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="full_name"
        value={form.full_name}
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="email"
        value={form.email}
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="department"
        value={form.department}
        placeholder="Department"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Employee
      </button>
    </div>
  );
}
