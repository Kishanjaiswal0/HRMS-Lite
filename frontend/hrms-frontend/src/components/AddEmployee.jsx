import { useState } from "react";
import api from "../api";

export default function AddEmployee() {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      await api.post("/employees", form);
      alert("Employee added successfully");
      window.location.reload();
    } catch (err) {
      alert("Error adding employee");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-bold mb-3">Add Employee</h3>

      <input
        name="employee_id"
        placeholder="Employee ID"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="full_name"
        placeholder="Full Name"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="department"
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
