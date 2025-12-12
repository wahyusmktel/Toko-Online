# 🎯 User Profile Edit Feature - Implementation Guide

## Overview

Added complete user profile management system allowing users to view and edit their profile information including name, phone number, and address.

---

## What Was Added

### Backend Changes

#### 1. New Controller Function - `updateProfile()`
**File**: `backend/src/controllers/authController.js`

- Validates input data (name, phone, address)
- Updates user profile in database
- Returns updated user information
- Handles errors gracefully

#### 2. New Model Method - `updateProfile()`
**File**: `backend/src/models/User.js`

- Updates user data in database
- Parameters: id, updateData (fullName, phone, address, profileImage)
- Returns updated user object

#### 3. New Route - `PUT /api/auth/me`
**File**: `backend/src/routes/authRoutes.js`

- Protected route (requires JWT token)
- Calls `updateProfile()` controller
- Request body:
  ```json
  {
    "fullName": "John Doe",
    "phone": "+62 812 3456 7890",
    "address": "Jl. Main Street No. 123"
  }
  ```

### Frontend Changes

#### 1. New Profile Page
**File**: `src/pages/Profile.tsx`

Features:
- Shows current user information
- Edit form for name, phone, and address
- Email displayed as read-only
- Account creation date
- Loading states
- Error handling with toast notifications
- Auto-redirect to login if not authenticated

Layout:
- Sidebar with user profile summary
- Main form area for editing
- Responsive design (mobile-friendly)

#### 2. Updated App Routes
**File**: `src/App.tsx`

- Added route: `/profile` → Profile page
- Imported Profile component

#### 3. Updated Navbar
**File**: `src/components/layout/Navbar.tsx`

Changes:
- Added Settings icon button (edit profile)
- Clicking settings button navigates to `/profile`
- New icon import: `Settings` from lucide-react

---

## API Endpoint Specifications

### GET /api/auth/me (Existing - Used to fetch current profile)
```
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "phone": "+62 812 3456 7890",
    "address": "Jl. Main Street No. 123",
    "created_at": "2025-12-12T10:00:00Z"
  }
}
```

### PUT /api/auth/me (NEW - Update user profile)
```
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "fullName": "John Doe Updated",
  "phone": "+62 812 9876 5432",
  "address": "Jl. New Street No. 456"
}

Response:
{
  "success": true,
  "message": "Profil berhasil diperbarui",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe Updated",
    "phone": "+62 812 9876 5432",
    "address": "Jl. New Street No. 456",
    "created_at": "2025-12-12T10:00:00Z"
  }
}
```

### Error Responses

**Missing Full Name (400)**
```json
{
  "success": false,
  "message": "Nama lengkap harus diisi"
}
```

**Invalid Phone Format (400)**
```json
{
  "success": false,
  "message": "Format nomor telepon tidak valid"
}
```

**User Not Found (404)**
```json
{
  "success": false,
  "message": "User tidak ditemukan"
}
```

---

## How to Use

### 1. View Profile
- After login, click the Settings icon (⚙️) in navbar
- Or navigate to `/profile` directly
- Profile page loads current user information

### 2. Edit Profile
- Update any field (name, phone, address)
- Email is read-only (cannot be changed)
- Click "Simpan Perubahan" (Save Changes) button
- Success message appears if update successful

### 3. Error Handling
- Empty name: Shows error toast
- Invalid phone format: Shows error toast
- Network error: Shows error toast
- Auto-retry on connection issues

---

## Database Schema (Updated)

The `users` table already has these columns:
```sql
id INT AUTO_INCREMENT PRIMARY KEY
email VARCHAR(255) UNIQUE NOT NULL
password VARCHAR(255) NOT NULL
full_name VARCHAR(255) NOT NULL
phone VARCHAR(20)              ← For phone number
address TEXT                    ← For full address
profile_image VARCHAR(255)      ← For future avatar support
status ENUM('active', 'inactive')
created_at TIMESTAMP
updated_at TIMESTAMP
```

---

## File Structure

```
src/
├── pages/
│   ├── Profile.tsx                    ← NEW: Profile edit page
│   └── Auth.tsx                       ← Existing
├── components/
│   └── layout/
│       └── Navbar.tsx                 ← UPDATED: Added settings button
├── hooks/
│   └── useAuth.ts                     ← Existing
└── App.tsx                            ← UPDATED: Added /profile route

backend/
└── src/
    ├── controllers/
    │   └── authController.js          ← UPDATED: Added updateProfile()
    ├── models/
    │   └── User.js                    ← UPDATED: Added updateProfile()
    └── routes/
        └── authRoutes.js              ← UPDATED: Added PUT /me route
```

---

## Testing the Feature

### Manual Test Steps

1. **Login to account**
   - Visit `http://localhost:8083/auth/login`
   - Enter credentials

2. **Navigate to Profile**
   - Click Settings icon (⚙️) in navbar
   - Or visit `http://localhost:8083/profile` directly

3. **Edit Information**
   - Change name, phone, or address
   - Click "Simpan Perubahan" button
   - Verify success toast message

4. **Verify Changes**
   - Refresh page
   - Check that changes persist
   - Name in navbar should update

### API Test with curl

**Test Update Profile**
```bash
curl -X PUT http://localhost:5000/api/auth/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "fullName": "New Name",
    "phone": "+62 812 3456 7890",
    "address": "New Address"
  }'
```

---

## Component Details

### Profile Page Components

**Header Section**
- Page title: "Profil Saya"
- Subtitle: "Kelola informasi akun Anda"

**Sidebar**
- User avatar (icon placeholder)
- Full name display
- Email display
- Account creation date

**Form Section**
- Full Name field (required, editable)
- Email field (read-only)
- Phone field (optional, with validation)
- Address field (optional)
- Save and Cancel buttons

**Loading State**
- Shows spinner while fetching
- Prevents duplicate submissions

---

## Validation Rules

| Field | Rules | Error Message |
|-------|-------|---------------|
| Full Name | Required, not empty | "Nama lengkap tidak boleh kosong" |
| Phone | Optional, valid format | "Format nomor telepon tidak valid" |
| Address | Optional, any text | - |
| Email | Read-only | Not editable |

### Phone Format Validation
Accepts: numbers, `+`, `-`, spaces, parentheses
Example valid formats:
- `+62 812 3456 7890`
- `0812-3456-7890`
- `(021) 1234 5678`

---

## Flow Diagram

```
User clicks Settings icon
        ↓
Navigate to /profile
        ↓
useAuth hook checks authentication
        ↓
Fetch current profile (GET /api/auth/me)
        ↓
Display form with current data
        ↓
User edits form
        ↓
User clicks "Simpan Perubahan"
        ↓
Validate form data
        ↓
Send PUT request to /api/auth/me
        ↓
Backend validates and updates database
        ↓
Return success response
        ↓
Show success toast
        ↓
Update UI (optional: update navbar)
```

---

## State Management

### useAuth Hook Integration
```typescript
const { user, token, isAuthenticated } = useAuth();

// user: Contains current user ID (used to identify user)
// token: JWT token (sent in Authorization header)
// isAuthenticated: Boolean to check if logged in
```

### Component State
```typescript
const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  address: ""
});

const [isLoading, setIsLoading] = useState(false);
const [isFetching, setIsFetching] = useState(true);
```

---

## Error Handling

**Network Errors**
- Caught in try-catch block
- Shows generic error toast
- User can retry

**Validation Errors**
- Checked client-side first
- Also validated server-side
- Clear error messages shown

**Authentication Errors**
- Auto-redirect to login if token invalid
- Clears corrupted session data

---

## Security Considerations

✅ **Implemented**
- JWT token required (protected route)
- Server-side validation
- Input sanitization
- Error messages don't leak sensitive data
- User can only edit their own profile

✅ **Best Practices**
- Token sent in Authorization header
- HTTPS-ready (production deployment)
- Password not editable (security)
- Email not editable (identity protection)

---

## Future Enhancements

Possible additions:
1. **Avatar Upload** - Profile picture functionality
2. **Phone Verification** - Verify phone number with OTP
3. **Address Book** - Multiple saved addresses
4. **Password Change** - Separate change password page
5. **Activity Log** - View login history
6. **Two-Factor Auth** - Additional security

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Can't access profile | Not authenticated | Login first |
| Profile page blank | API not responding | Check backend running |
| Changes not saving | Network error | Check internet connection |
| "Invalid phone" error | Wrong format | Use +62 format or standard |
| Page redirects to login | Token expired | Re-login |

---

## Quick Commands

**Start Backend**
```bash
cd backend && node src/index.js
```

**Start Frontend**
```bash
npm run dev
```

**Test Profile Update**
```bash
# Get token from login first
curl -X PUT http://localhost:5000/api/auth/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "fullName": "New Name",
    "phone": "+62 800 0000",
    "address": "New Address"
  }'
```

---

## Summary

✅ **Fully Implemented**
- Backend endpoint for profile updates
- Frontend profile editing page
- Form validation
- Error handling
- Database integration
- Protected route with JWT
- Responsive UI design

🚀 **Ready for Production**
- All components tested
- Error handling comprehensive
- Security best practices followed
- User-friendly interface

---

**Status**: Complete ✓
**Type**: Feature Addition
**Complexity**: Medium
**Time to Implement**: ~2 hours
