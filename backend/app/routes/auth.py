from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Admin
from app.schemas import LoginRequest, LoginResponse, ChangePasswordRequest
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

@router.put("/change-password", status_code=status.HTTP_204_NO_CONTENT)
def change_password(
    credentials: ChangePasswordRequest,
    db: Session = Depends(get_db),
    # In a real app, you'd extract the current user from the token dependencies here
    # For this lite version, we'll assume there is only one admin or we check against the only admin
):
    admin = db.query(Admin).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
        
    if not verify_password(credentials.old_password, admin.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect old password")
        
    from app.auth_utils import get_password_hash
    admin.password_hash = get_password_hash(credentials.new_password)
    db.commit()
    return None
