import http.client
import json

conn = http.client.HTTPConnection("127.0.0.1", 8000)
payload = json.dumps({
    "username": "admin",
    "password": "admin123"
})
headers = {
    'Content-Type': "application/json"
}

try:
    print("Sending POST request to http://127.0.0.1:8000/auth/login...")
    conn.request("POST", "/auth/login", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print(f"Status Code: {res.status}")
    print("Response Content:")
    print(data.decode("utf-8"))
except Exception as e:
    print(f"Error occurred: {e}")
finally:
    conn.close()
