import { UserModel } from "../models/User.js";
import { generateToken } from "../utils/jwt.js";

// Register handler
export async function register(req, res, next) {
  try {
    const { email, password, fullName } = req.body;

    // Validasi input
    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: "Email, password, dan nama lengkap harus diisi",
      });
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format email tidak valid",
      });
    }

    // Validasi password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password minimal 6 karakter",
      });
    }

    // Check apakah email sudah terdaftar
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    // Create user
    const userId = await UserModel.create(email, password, fullName);

    // Generate token
    const token = generateToken(userId);

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: {
        id: userId,
        email,
        fullName,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Login handler
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password harus diisi",
      });
    }

    // Find user by email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // Verify password
    const isPasswordValid = await UserModel.verifyPassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: "Login berhasil",
      data: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Get current user profile
export async function getCurrentUser(req, res, next) {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
