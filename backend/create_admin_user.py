"""
Create Admin Table and Default User using SQLAlchemy
Run this script to create the admins table and add default admin user
"""
from app.database import engine, SessionLocal
from app.models import Base, Admin
from app.auth_utils import get_password_hash

# Create all tables (including admins)
print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("✓ Tables created")

# Create default admin user
db = SessionLocal()
try:
    # Check if admin already exists
    existing_admin = db.query(Admin).filter(Admin.username == "admin").first()
    
    if existing_admin:
        print("⚠ Admin user already exists")
    else:
        # Create new admin
        admin = Admin(
            username="admin",
            password_hash=get_password_hash("admin123"),
            full_name="Administrator"
        )
        db.add(admin)
        db.commit()
        print("✓ Admin user created successfully")
        print(f"  Username: admin")
        print(f"  Password: admin123")
        print(f"  Full Name: {admin.full_name}")
        
    # Verify
    all_admins = db.query(Admin).all()
    print(f"\n✓ Total admins in database: {len(all_admins)}")
    for admin in all_admins:
        print(f"  - {admin.username} ({admin.full_name})")
        
except Exception as e:
    print(f"✗ Error: {e}")
    db.rollback()
finally:
    db.close()
