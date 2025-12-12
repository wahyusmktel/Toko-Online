# Authentication Testing Guide

## Prerequisites

Before testing, ensure both servers are running:

### Backend Server
```bash
cd backend
node src/index.js
```
Expected output:
```
✓ MySQL connection successful
✓ Server running on http://localhost:5000
```

### Frontend Dev Server
```bash
npm run dev
```
Expected output:
```
VITE v7.2.7 ready in ... ms
➜ Local: http://localhost:8083/
```

---

## Test Case 1: User Registration

**Objective**: Create a new user account through the registration form

### Steps:
1. Open browser to `http://localhost:8083/auth/register`
2. Fill in the form:
   - **Nama Lengkap**: `Test User`
   - **Email**: `testuser@example.com`
   - **Password**: `password123`
   - **Konfirmasi Password**: `password123`
3. Click "Daftar" (Register) button

### Expected Results:
✓ Form validates (error if passwords don't match or email invalid)
✓ Toast notification shows "Registered successfully"
✓ Redirected to home page (`/`)
✓ Navbar shows user's name `Test User`
✓ Logout button visible next to user name
✓ "Masuk" button hidden

### Database Verification:
```bash
# Check if user was created
mysql -u root shopee_red -e "SELECT id, email, full_name FROM users WHERE email='testuser@example.com';"
```

Expected output:
```
+----+----------------------+-----------+
| id | email                | full_name |
+----+----------------------+-----------+
|  1 | testuser@example.com | Test User |
+----+----------------------+-----------+
```

---

## Test Case 2: User Login

**Objective**: Authenticate user with email and password

### Steps:
1. Open new browser tab or clear localStorage (Ctrl+Shift+Delete)
2. Navigate to `http://localhost:8083/auth/login`
3. Fill in login form:
   - **Email**: `testuser@example.com`
   - **Password**: `password123`
4. Click "Masuk" (Login) button

### Expected Results:
✓ Form validates email and password presence
✓ Toast notification shows "Logged in successfully"
✓ Redirected to home page (`/`)
✓ Navbar shows user's name `Test User`
✓ JWT token stored in browser localStorage

### Browser Console Verification:
Open Developer Tools (F12) → Application → Local Storage → http://localhost:8083
Should see:
- **authToken**: JWT token (starts with `eyJ...`)
- **user**: JSON object with id, email, fullName

---

## Test Case 3: Invalid Credentials

**Objective**: Verify error handling for incorrect login

### Steps:
1. Navigate to `http://localhost:8083/auth/login`
2. Fill in login form:
   - **Email**: `testuser@example.com`
   - **Password**: `wrongpassword`
3. Click "Masuk" button

### Expected Results:
✓ Toast notification shows "Invalid email or password"
✓ User remains on login page
✓ No token stored in localStorage
✓ Navbar still shows "Masuk" button (not authenticated)

---

## Test Case 4: Invalid Registration (Email Validation)

**Objective**: Verify form validation

### Steps:
1. Navigate to `http://localhost:8083/auth/register`
2. Fill in form:
   - **Nama Lengkap**: `Test`
   - **Email**: `invalidemail` (missing @)
   - **Password**: `password123`
   - **Konfirmasi Password**: `password123`
3. Try to submit

### Expected Results:
✓ Form shows client-side validation error: "Please enter a valid email"
✓ Submit button disabled or form doesn't send

---

## Test Case 5: Password Mismatch

**Objective**: Verify password confirmation validation

### Steps:
1. Navigate to `http://localhost:8083/auth/register`
2. Fill in form:
   - **Nama Lengkap**: `Test User`
   - **Email**: `another@example.com`
   - **Password**: `password123`
   - **Konfirmasi Password**: `different456`
3. Try to submit

### Expected Results:
✓ Form shows validation error: "Passwords don't match"
✓ Submit button disabled or form doesn't send
✓ No API call made to backend

---

## Test Case 6: Logout

**Objective**: Clear authentication and return to unauthenticated state

### Steps:
1. After successful login (Test Case 2), verify navbar shows user name
2. Click logout button (LogOut icon next to user name)

### Expected Results:
✓ Redirected to home page (`/`)
✓ Navbar shows "Masuk" button (not logged in)
✓ Auth token removed from localStorage
✓ User info removed from localStorage

### Browser Console Verification:
Open Developer Tools → Application → Local Storage
Should no longer see `authToken` or `user` keys

---

## Test Case 7: Persistent Login

**Objective**: Verify user stays logged in after page refresh

### Steps:
1. Complete login (Test Case 2)
2. Refresh page (F5 or Ctrl+R)

### Expected Results:
✓ User remains logged in
✓ Navbar shows user's name (not "Masuk" button)
✓ No need to login again
✓ Token loaded from localStorage automatically

---

## Test Case 8: Duplicate Email Registration

**Objective**: Verify system prevents duplicate emails

### Steps:
1. Register user with email `duplicate@example.com`
2. Try to register another account with same email
3. Fill in form and submit

### Expected Results:
✓ Toast notification shows error: "Email already registered" or similar
✓ User remains on registration page
✓ No new user created in database

### Database Verification:
```bash
mysql -u root shopee_red -e "SELECT COUNT(*) as count FROM users WHERE email='duplicate@example.com';"
```
Should return count = 1

---

## API Testing (Command Line)

### Test Register Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "curl@example.com",
    "password": "password123",
    "fullName": "Curl Test"
  }'
```

Expected response (200 OK):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 2,
    "email": "curl@example.com",
    "fullName": "Curl Test",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Test Login Endpoint
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "curl@example.com",
    "password": "password123"
  }'
```

Expected response (200 OK):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 2,
      "email": "curl@example.com",
      "fullName": "Curl Test"
    }
  }
}
```

### Test Protected Endpoint (Get Current User)
```bash
# Replace TOKEN with actual JWT from login response
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

Expected response (200 OK):
```json
{
  "success": true,
  "data": {
    "id": 2,
    "email": "curl@example.com",
    "fullName": "Curl Test"
  }
}
```

---

## Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:**
- Verify backend server is running: `cd backend && node src/index.js`
- Check port 5000 is available: `netstat -an | find "5000"`
- Verify `.env` has correct DB credentials

### Issue: "Email already exists" on first registration
**Solution:**
- Clear database: `mysql -u root shopee_red -e "DELETE FROM users;"`
- Reinitialize: `cd backend && node src/scripts/initDb.js`

### Issue: JWT not working on protected route
**Solution:**
- Verify token format in localStorage (should start with `eyJ`)
- Check JWT_SECRET in `backend/.env` matches `backend/src/utils/jwt.js`

### Issue: CORS errors in browser console
**Solution:**
- Update `FRONTEND_URL` in `backend/.env` to match frontend URL
- Restart backend: Ctrl+C and `node src/index.js`

### Issue: "Cannot POST /api/auth/register"
**Solution:**
- Verify routes are mounted in `backend/src/index.js`
- Check that authRoutes.js is properly imported
- Restart backend server

---

## Checklist

After completing all test cases, verify:

- [ ] User can register with valid data
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong password
- [ ] Form validation prevents invalid email format
- [ ] Password confirmation is validated
- [ ] Navbar shows user name when logged in
- [ ] Navbar shows logout button when logged in
- [ ] Navbar shows "Masuk" button when logged out
- [ ] Logout clears all auth data
- [ ] Login persists after page refresh
- [ ] Cannot register duplicate email
- [ ] API endpoints respond correctly to curl requests
- [ ] JWT token is properly stored and used
- [ ] Database has correct user records

---

## Success Criteria

✓ All 8 test cases pass
✓ No console errors related to authentication
✓ Token persists correctly in localStorage
✓ User profile displays in navbar
✓ All validation works as expected
✓ API endpoints respond with correct data

---

**Testing Date**: _____________
**Tester Name**: _____________
**Status**: [ ] Pass [ ] Fail
**Notes**: ________________________________________________
