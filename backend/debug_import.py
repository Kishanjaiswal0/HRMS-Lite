import traceback
import sys
import os

# Add the current directory to sys.path
sys.path.append(os.getcwd())

try:
    print("Testing app.main import...")
    import app.main
    print("app.main imported successfully")
except Exception as e:
    print("app.main import failed")
    traceback.print_exc()

try:
    print("\nTesting app.routes.auth import...")
    import app.routes.auth
    print("app.routes.auth imported successfully")
except Exception as e:
    print("app.routes.auth import failed")
    traceback.print_exc()
