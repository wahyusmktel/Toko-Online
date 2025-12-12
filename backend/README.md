# Shopee Red Backend API

Backend e-commerce API dibangun dengan Express.js, MySQL, dan JWT authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- MySQL 5.7+ atau MariaDB
- npm atau yarn

### Installation

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env
   ```

3. **Initialize database**
   ```bash
   node src/scripts/initDb.js
   ```

4. **Start server**
   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   node src/index.js
   ```

Server akan berjalan di `http://localhost:5000`

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### POST `/auth/register`
Registrasi user baru

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Validations:**
- Email harus valid dan unik
- Password minimal 6 karakter
- fullName required

---

#### POST `/auth/login`
Login dan dapatkan JWT token

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

#### GET `/auth/me`
Get profil user yang sedang login

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "created_at": "2025-12-12T12:00:00.000Z"
  }
}
```

---

#### GET `/health`
Health check endpoint

**Response (200):**
```json
{
  "status": "Server is running"
}
```

## 🗄️ Database Schema

### users table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  profile_image VARCHAR(255),
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
```

## 🔐 Security Features

- ✅ **Password Hashing**: bcrypt dengan 10 salt rounds
- ✅ **JWT Authentication**: Token-based auth dengan expiry
- ✅ **CORS**: Configured untuk frontend
- ✅ **Email Validation**: Format dan uniqueness check
- ✅ **Error Handling**: Standardized error responses

## 📝 Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=shopee_red

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:8080
```

## 🛠️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js           # MySQL pool setup
│   ├── controllers/
│   │   └── authController.js     # Request handlers
│   ├── middleware/
│   │   └── auth.js               # JWT & error handling
│   ├── models/
│   │   └── User.js               # Database operations
│   ├── routes/
│   │   └── authRoutes.js         # API endpoints
│   ├── utils/
│   │   ├── jwt.js                # Token functions
│   │   └── password.js           # Bcrypt utilities
│   ├── scripts/
│   │   └── initDb.js             # DB initialization
│   └── index.js                  # Express app
├── .env.example
├── .gitignore
└── package.json
```

## 🔄 Authentication Flow

1. **Register/Login** → POST to `/api/auth/*`
2. **Get Token** → Returned in response
3. **Store Token** → Save in localStorage (frontend)
4. **Use Token** → Include in `Authorization: Bearer <token>` header
5. **Token Expiry** → 7 days (configurable)
6. **Refresh Flow** → Re-login when token expires

## 📚 Adding New Endpoints

### 1. Create Controller
```javascript
// src/controllers/productController.js
export async function getProducts(req, res, next) {
  try {
    // Your logic here
    res.json({ success: true, data: [] });
  } catch (error) {
    next(error);
  }
}
```

### 2. Create Routes
```javascript
// src/routes/productRoutes.js
import express from 'express';
import { getProducts } from '../controllers/productController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
router.get('/', authenticateToken, getProducts);
export default router;
```

### 3. Mount in App
```javascript
// src/index.js
import productRoutes from './routes/productRoutes.js';
app.use('/api/products', productRoutes);
```

## 🧪 Testing API

### Using cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","fullName":"User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# Get Profile (replace TOKEN)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman
1. Create POST request to `http://localhost:5000/api/auth/register`
2. Set Body → raw → JSON
3. Copy token from response
4. Use token in GET `/api/auth/me` with header `Authorization: Bearer <token>`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `MySQL connection failed` | Pastikan MySQL running, check .env credentials |
| `Port 5000 already in use` | Ubah PORT di .env atau kill process |
| `auth_gssapi_client error` | Gunakan script initDb.js yang sudah fixed |
| `Module not found` | Jalankan `npm install` di folder backend |

## 📦 Dependencies

- **express** ^4.18.2 - Web framework
- **mysql2** ^3.6.5 - MySQL driver
- **jsonwebtoken** ^8.5.1 - JWT token handling
- **bcrypt** ^5.0.1 - Password hashing
- **dotenv** ^16.0.3 - Environment variables
- **cors** ^2.8.5 - CORS handling

## 🚀 Deployment Checklist

- [ ] Update JWT_SECRET dengan key yang aman
- [ ] Set NODE_ENV=production
- [ ] Configure database untuk production
- [ ] Update FRONTEND_URL untuk domain production
- [ ] Enable HTTPS
- [ ] Setup environment variables di production
- [ ] Test semua endpoints
- [ ] Setup monitoring & logging

## 📄 License

Bagian dari Shopee Red Showcase project

## 🤝 Contributing

1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Submit PR with description

---

**Last Updated**: 2025-12-12
**Version**: 1.0.0
