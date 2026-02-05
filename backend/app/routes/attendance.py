from datetime import date
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Attendance, Employee
from app.schemas import AttendanceCreate, AttendanceResponse


router = APIRouter()

@router.post("", response_model=AttendanceResponse)
def mark_attendance(
    attendance_data: AttendanceCreate,
    db: Session = Depends(get_db),
):
    try:
        print(f"Received attendance data: {attendance_data.dict()}")
        attendance = Attendance(**attendance_data.dict())
        print(f"Created attendance object: {attendance}")
        db.add(attendance)
        print("Added to session")
        db.commit()
        print("Committed")
        db.refresh(attendance)
        print(f"Refreshed: {attendance}")
        return attendance
    except Exception as e:
        print(f"ERROR marking attendance: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        db.rollback()
        raise

@router.get("/{employee_id}")
def get_attendance(
    employee_id: str,
    db: Session = Depends(get_db),
   
):
    return (
        db.query(Attendance)
        .filter(Attendance.employee_id == employee_id)
        .all()
    )

# 🔥 DASHBOARD DATA (IMPORTANT)
@router.get("/dashboard/summary")
def dashboard_summary(
    db: Session = Depends(get_db)
):
    today = str(date.today())

    records = (
        db.query(Attendance, Employee)
        .join(Employee, Attendance.employee_id == Employee.id)
        .filter(Attendance.date == today)
        .all()
    )

    present = 0
    absent = 0
    late = 0
    on_duty = 0
    activity = []

    for att, emp in records:
        if att.status == "Present":
            present += 1
        elif att.status == "Absent":
            absent += 1
        elif att.status == "Late":
            late += 1
        elif att.status == "On Duty":
            on_duty += 1

        activity.append({
            "name": emp.full_name,
            "status": att.status
        })

    return {
        "present": present,
        "absent": absent,
        "late": late,
        "on_duty": on_duty,
        "activity": activity
    }
