from pydantic import BaseModel, EmailStr
from datetime import date
from typing import List

# =========================
# EMPLOYEE SCHEMAS
# =========================

class EmployeeBase(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        from_attributes = True


# =========================
# ATTENDANCE SCHEMAS
# =========================

class AttendanceBase(BaseModel):
    employee_id: int   # DATABASE employee.id
    date: date
    status: str        # Present / Absent / Leave


class AttendanceCreate(AttendanceBase):
    pass


class AttendanceResponse(AttendanceBase):
    id: int

    class Config:
        from_attributes = True


# =========================
# DASHBOARD SUMMARY
# =========================

class AttendanceSummary(BaseModel):
    present: int
    absent: int
    total: int


# Authentication Schemas
class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    admin_name: str


class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str
