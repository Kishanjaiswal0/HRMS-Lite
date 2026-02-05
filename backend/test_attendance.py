from app.database import SessionLocal
from app.models import Attendance
from datetime import date
import sys

try:
    db = SessionLocal()
    att = Attendance(
        employee_id=1,
        date=date(2026, 2, 6),
        status='Present'
    )
    db.add(att)
    db.commit()
    db.refresh(att)
    print(f"✅ SUCCESS! Attendance ID: {att.id}")
except Exception as e:
    with open('error_log.txt', 'w') as f:
        f.write(f"ERROR: {str(e)}\n\n")
        import traceback
        traceback.print_exc(file=f)
    print(f"❌ ERROR: {e}")
    print("Full error written to error_log.txt")
finally:
    db.close()
