from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Admin
from app.schemas import LoginRequest, LoginResponse
from app.auth_utils import verify_password, create_access_token

router = APIRouter()

@router.post("/login", response_model=LoginResponse)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate admin user and return JWT token
    """
    # Find admin by username
    admin = db.query(Admin).filter(Admin.username == credentials.username).first()
    
    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    # Create access token
    access_token = create_access_token(
        data={"sub": admin.username, "admin_id": admin.id}
    )
    
    return LoginResponse(
        access_token=access_token,
        admin_name=admin.full_name or admin.username
    )
