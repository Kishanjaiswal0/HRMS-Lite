import AddEmployee from "../components/AddEmployee";
import EmployeeList from "../components/EmployeeList";

export default function Employees() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>
      <AddEmployee />
      <EmployeeList />
    </div>
  );
}

