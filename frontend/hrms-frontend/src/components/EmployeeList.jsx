import { useEffect, useState } from "react";
import api from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      api.delete(`/employees/${id}`)
        .then(() => {
          setEmployees(employees.filter(emp => emp.id !== id));
        })
        .catch(err => console.error("Failed to delete employee", err));
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading employees...</p>;
  }

  if (employees.length === 0) {
    return <p className="text-gray-500">No employees found</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Employees</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td className="border p-2">{emp.employee_id}</td>
              <td className="border p-2">{emp.full_name}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">{emp.department}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(emp.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
