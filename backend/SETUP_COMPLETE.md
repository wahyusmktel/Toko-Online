# Backend Setup Verification

## ✅ Setup Completed Successfully

### 1. Dependencies Installation ✓
```bash
npm install
```
- Express 4.18.2
- MySQL2 3.6.5 
- jsonwebtoken 8.5.1 (stable version)
- bcrypt 5.0.1
- dotenv, cors, express-validator
- Total: 250 packages installed

### 2. Environment Configuration ✓
**File**: `backend/.env`

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=shopee_red
PORT=5000
NODE_ENV=development
JWT_SECRET=shopee_red_super_secret_key_2025_development_only
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:8080
```

### 3. Database Initialization ✓
**Command**: `node src/scripts/initDb.js`

Output:
```
✓ Database initialized successfully
✓ Database 'shopee_red' created or already exists
✓ Users table created or already exists
```

**Tables Created**:
- `users` table with the following fields:
  - id (INT AUTO_INCREMENT PRIMARY KEY)
  - email (VARCHAR(255) UNIQUE NOT NULL)
  - password (VARCHAR(255) NOT NULL - bcrypt hashed)
  - full_name (VARCHAR(255) NOT NULL)
  - phone, address, profile_image (optional fields)
  - status (ENUM - active/inactive, default: active)
  - created_at, updated_at (TIMESTAMP with indexes)

### 4. Backend Server Status ✓
**Command**: `node src/index.js`

Output:
```
✓ MySQL connection successful
✓ Server running on http://localhost:5000
```

**Server Details**:
- Port: 5000
- Environment: development
- CORS enabled for http://localhost:8080
- Health endpoint: http://localhost:5000/api/health

## 📋 Available API Endpoints

### Authentication Routes (prefix: `/api/auth`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/register` | POST | ❌ | Register new user |
| `/login` | POST | ❌ | Login and get JWT token |
| `/me` | GET | ✅ Bearer Token | Get current user profile |

### Request/Response Examples

#### Register
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123",
  "fullName": "John Doe"
}

Response (201):
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

#### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepass123"
}

Response (200):
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

#### Get Profile
```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

Response (200):
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

## 🚀 How to Run Backend

### Development Mode (with auto-reload)
```bash
cd backend
npm run dev
# Server will restart automatically on file changes
```

### Production Mode
```bash
cd backend
node src/index.js
```

## 🔧 Troubleshooting

### If MySQL Connection Fails
- Ensure MySQL/MariaDB service is running
- Check DB_HOST, DB_USER, DB_PASSWORD in .env
- Verify database `shopee_red` exists: `node src/scripts/initDb.js`

### If Port 5000 is Already in Use
- Change PORT in .env file
- Or kill the process: `lsof -ti:5000 | xargs kill -9` (Linux/Mac)

### If `npm install` Fails
- Clear cache: `npm cache clean --force`
- Delete node_modules and package-lock.json
- Run `npm install` again

## 📚 Project Structure

```
backend/
├── src/
│   ├── config/database.js        # MySQL pool configuration
│   ├── controllers/
│   │   └── authController.js     # Auth endpoints logic
│   ├── middleware/
│   │   └── auth.js               # JWT & error handling
│   ├── models/
│   │   └── User.js               # User database operations
│   ├── routes/
│   │   └── authRoutes.js         # Auth API routes
│   ├── utils/
│   │   ├── jwt.js                # JWT token functions
│   │   └── password.js           # Bcrypt functions
│   ├── scripts/
│   │   └── initDb.js             # Database initialization
│   └── index.js                  # Express app entry point
├── package.json
├── .env                          # Configuration (created from .env.example)
├── .env.example                  # Configuration template
└── .gitignore
```

## ✨ Next Steps

1. **Test API Endpoints** - Use Postman, curl, or frontend to test endpoints
2. **Integrate Frontend** - Connect React frontend auth pages to backend
3. **Add More Features** - Extend with product, cart, order endpoints
4. **Deploy** - Set up production environment with real JWT_SECRET

---
**Setup Date**: 2025-12-12
**Backend Version**: 1.0.0
**Node.js**: v22.17.0
