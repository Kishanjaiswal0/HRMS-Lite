from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.database import engine, Base
from app.routes.employee import router as employee_router
from app.routes.attendance import router as attendance_router
from app.routes.auth import router as auth_router
import traceback

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"\n{'='*50}")
    print(f"GLOBAL ERROR HANDLER CAUGHT:")
    print(f"Error: {str(exc)}")
    print(f"Type: {type(exc).__name__}")
    print(f"Request: {request.method} {request.url}")
    traceback.print_exc()
    print(f"{'='*50}\n")
    
    response = JSONResponse(
        status_code=500,
        content={"detail": str(exc), "type": type(exc).__name__}
    )
    # Add CORS headers so frontend can read the error
    response.headers["Access-Control-Allow-Origin"] = "https://hrms-lite-snowy-rho.vercel.app/"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# Configure CORS to allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://hrms-lite-snowy-rho.vercel.app/"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(employee_router, prefix="/employees", tags=["Employees"])
app.include_router(attendance_router, prefix="/attendance", tags=["Attendance"])
