const submit = async () => {
  try {
    await api.post("/attendance", {
      employee_id: Number(employeeId),
      date,
      status,
    });

    alert("Attendance marked successfully");
  } catch (err) {
    alert("Error marking attendance");
  }
};
