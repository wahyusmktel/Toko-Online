import { pool } from "../config/database.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

// User model untuk database operations
export class UserModel {
  // Create user baru
  static async create(email, password, fullName) {
    const hashedPassword = await hashPassword(password);
    const query =
      "INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)";

    const [result] = await pool.query(query, [email, hashedPassword, fullName]);
    return result.insertId;
  }

  // Find user by email
  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(query, [email]);
    return rows[0] || null;
  }

  // Find user by ID
  static async findById(id) {
    const query =
      "SELECT id, email, full_name, created_at FROM users WHERE id = ?";
    const [rows] = await pool.query(query, [id]);
    return rows[0] || null;
  }

  // Verify password
  static async verifyPassword(plainPassword, hashedPassword) {
    return comparePassword(plainPassword, hashedPassword);
  }
}
