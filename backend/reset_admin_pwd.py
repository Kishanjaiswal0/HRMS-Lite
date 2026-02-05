from app.database import SessionLocal
from app.models import Admin
from app.auth_utils import get_password_hash

def reset_admin_password():
    db = SessionLocal()
    try:
        admin = db.query(Admin).filter(Admin.username == "admin").first()
        if not admin:
            print("Admin user not found, creating new one...")
            admin = Admin(
                username="admin",
                password_hash=get_password_hash("admin123"),
                full_name="Administrator"
            )
            db.add(admin)
        else:
            print(f"Updating password for admin: {admin.username}")
            admin.password_hash = get_password_hash("admin123")
        
        db.commit()
        print("✓ Admin password has been reset to 'admin123'")
        print(f"✓ New hash stored: {admin.password_hash}")
        
    except Exception as e:
        print(f"✗ Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin_password()
