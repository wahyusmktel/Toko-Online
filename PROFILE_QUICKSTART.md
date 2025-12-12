# 👤 User Profile Edit - Quick Start

## ✅ What's Ready

Halaman edit profil user sudah siap digunakan dengan fitur lengkap:

- ✅ Form edit profil (nama, telepon, alamat)
- ✅ Validasi form (client + server)
- ✅ Simpan ke database
- ✅ Loading indicator
- ✅ Error handling
- ✅ Navigation settings button di navbar

---

## 🚀 How to Test (5 Minutes)

### Step 1: Login

```
1. Go to http://localhost:8083/auth/login
2. Enter registered email & password
3. You'll see your name in navbar
```

### Step 2: Click Settings Button

```
1. Look at navbar (logged in state)
2. Click the settings icon (⚙️) next to logout
3. Profile page will open
```

### Step 3: Edit Profile

```
1. Change nama lengkap, telepon, atau alamat
2. Click "Simpan Perubahan" button
3. See success message (green toast)
```

### Step 4: Verify Changes

```
1. Refresh page (F5)
2. Check if changes persist
3. Your name in navbar updates too
```

---

## 📍 URL & Navigation

| Action       | URL        | How to Access                       |
| ------------ | ---------- | ----------------------------------- |
| View Profile | `/profile` | Click settings icon in navbar       |
| Edit Profile | `/profile` | Same page (form below profile card) |
| Back to Home | `/`        | Click "Batal" button                |

---

## 🔧 API Endpoint

### Update Profile

```bash
PUT /api/auth/me
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "fullName": "New Name",
  "phone": "+62 812 3456 7890",
  "address": "Jl. Main St No. 123"
}
```

---

## 📝 Form Fields

| Field        | Type  | Required | Editable | Rules                 |
| ------------ | ----- | -------- | -------- | --------------------- |
| Nama Lengkap | Text  | Yes      | ✅       | Min 1 char            |
| Email        | Text  | No       | ❌       | Read-only             |
| Telepon      | Phone | No       | ✅       | Format: +62 or digits |
| Alamat       | Text  | No       | ✅       | Any text              |

---

## 🛡️ Validation

**Akan muncul error jika:**

- Nama kosong: "Nama lengkap tidak boleh kosong"
- Telepon salah format: "Format nomor telepon tidak valid"
- Network error: "Gagal memperbarui profil"

**Contoh format telepon yang valid:**

- `+62 812 3456 7890`
- `0812-3456-7890`
- `(021) 1234 5678`

---

## 🎨 UI Components

### Sidebar (Left)

- Avatar placeholder (user icon)
- Nama user
- Email
- Tanggal akun dibuat

### Form Area (Right)

- Input field: Nama Lengkap
- Input field: Email (disabled)
- Input field: Telepon
- Input field: Alamat
- Button: Simpan Perubahan
- Button: Batal

---

## 📋 File Changes

### Created

- `src/pages/Profile.tsx` - Profile page component

### Modified

- `src/App.tsx` - Added /profile route
- `src/components/layout/Navbar.tsx` - Added settings button
- `backend/src/controllers/authController.js` - Added updateProfile()
- `backend/src/models/User.js` - Added updateProfile()
- `backend/src/routes/authRoutes.js` - Added PUT /me route

---

## 🧪 Testing Scenarios

### Scenario 1: Edit Nama

```
1. Login
2. Go to profile
3. Change nama
4. Click Simpan
✓ Toast: "Profil berhasil diperbarui"
✓ Nama di navbar berubah
```

### Scenario 2: Add Telepon & Alamat

```
1. Profile page
2. Fill telepon: +62 812 3456 7890
3. Fill alamat: Jl. Main Street
4. Click Simpan
✓ Data tersimpan di database
```

### Scenario 3: Invalid Telepon

```
1. Fill telepon: abc123
2. Click Simpan
✓ Toast error: "Format nomor telepon tidak valid"
✓ Tidak disimpan ke database
```

### Scenario 4: Empty Nama

```
1. Clear nama field
2. Click Simpan
✓ Toast error: "Nama lengkap tidak boleh kosong"
✓ Form stays open
```

---

## 🔐 Security

✅ Protected - Requires JWT token
✅ Authenticated - Only your own profile editable
✅ Validated - Server-side input validation
✅ Secure - Email & password not editable

---

## 🐛 Troubleshooting

| Problem                 | Solution                       |
| ----------------------- | ------------------------------ |
| Can't access profile    | Login first                    |
| Settings button missing | Check if logged in             |
| Changes not saving      | Check internet connection      |
| Backend error           | Verify backend running on 5000 |
| "Format tidak valid"    | Use +62 format for phone       |

---

## 📊 Database Changes

Database sudah ready dengan fields:

- `full_name` - Nama lengkap (required)
- `phone` - Nomor telepon (optional)
- `address` - Alamat (optional)
- `profile_image` - Avatar (optional, future use)

---

## 💡 Tips

**Quick Test:**

```bash
# Terminal 1: Backend
cd backend && node src/index.js

# Terminal 2: Frontend
npm run dev

# Browser: http://localhost:8083/auth/login
# Then: Click settings icon → Edit profile
```

**Check Changes in DB:**

```bash
mysql -u root shopee_red
SELECT id, email, full_name, phone, address FROM users;
```

---

## 🎯 Feature Checklist

- [x] Form validation (client-side)
- [x] API endpoint (PUT /api/auth/me)
- [x] Backend validation (server-side)
- [x] Database integration
- [x] Error handling
- [x] Loading states
- [x] Success messages
- [x] Navigation
- [x] Responsive design
- [x] Protected route (JWT)

---

## 📚 Documentation

Full details: See `PROFILE_FEATURE.md` for complete documentation

---

**Status**: ✅ Ready to Test
**Version**: 1.0
**Next Steps**: Test all scenarios, then implement more features

🎉 Enjoy!
