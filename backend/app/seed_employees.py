from app.database import SessionLocal, engine, Base
from app.models import Employee

# Ensure tables exist
Base.metadata.create_all(bind=engine)


def seed_employees():
    db = SessionLocal()

    # Check if employees already exist
    if db.query(Employee).first():
        print("✅ Employees already exist. Skipping seed.")
        db.close()
        return

    employees = [
        Employee(
            employee_id="EMP001",
            full_name="Kishan Jaiswal",
            email="kishan@example.com",
            department="Admin"
        ),
        Employee(
            employee_id="EMP002",
            full_name="Rahul Sharma",
            email="rahul@example.com",
            department="Engineering"
        ),
        Employee(
            employee_id="EMP003",
            full_name="Anita Verma",
            email="anita@example.com",
            department="HR"
        )
    ]

    db.add_all(employees)
    db.commit()
    db.close()

    print("✅ Sample employees inserted successfully!")


if __name__ == "__main__":
    seed_employees()
