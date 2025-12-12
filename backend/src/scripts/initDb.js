import { spawn } from "child_process";
import dotenv from "dotenv";

dotenv.config();

async function initializeDatabaseViaCLI() {
  return new Promise((resolve, reject) => {
    // SQL commands to create database and table
    const sqlCommands = `
CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};
USE ${process.env.DB_NAME};
CREATE TABLE IF NOT EXISTS users (
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
    `;

    // Build mysql command with password handling
    const mysqlArgs = [
      "-h",
      process.env.DB_HOST || "localhost",
      "-u",
      process.env.DB_USER || "root",
    ];

    if (process.env.DB_PASSWORD) {
      mysqlArgs.push(`-p${process.env.DB_PASSWORD}`);
    }

    // Execute using mysql CLI
    const mysql = spawn("mysql", mysqlArgs);

    let stderr = "";
    let stdout = "";

    mysql.stdin.write(sqlCommands);
    mysql.stdin.end();

    mysql.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    mysql.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    mysql.on("close", (code) => {
      if (code === 0 || stderr === "") {
        console.log("✓ Database initialized successfully");
        console.log(
          `✓ Database '${process.env.DB_NAME}' created or already exists`
        );
        console.log("✓ Users table created or already exists");
        resolve();
      } else {
        console.error("Database initialization error:", stderr);
        reject(new Error(stderr));
      }
    });

    mysql.on("error", (error) => {
      console.error("Failed to spawn mysql process:", error.message);
      reject(error);
    });
  });
}

// Run initialization
initializeDatabaseViaCLI().catch((error) => {
  console.error(error);
  process.exit(1);
});
