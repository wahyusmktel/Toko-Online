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
  profile_image LONGTEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);

 CREATE TABLE IF NOT EXISTS shops (
   id INT AUTO_INCREMENT PRIMARY KEY,
   owner_id INT NOT NULL,
   name VARCHAR(255) NOT NULL,
   description TEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
   INDEX idx_owner (owner_id)
 );

 CREATE TABLE IF NOT EXISTS products (
   id INT AUTO_INCREMENT PRIMARY KEY,
   shop_id INT NOT NULL,
   name VARCHAR(255) NOT NULL,
   price DECIMAL(10,2) NOT NULL,
   stock INT NOT NULL DEFAULT 0,
   category VARCHAR(100),
   description TEXT,
   image LONGTEXT,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE,
   INDEX idx_shop (shop_id),
   INDEX idx_category (category)
 );

 CREATE TABLE IF NOT EXISTS flash_sale_items (
   product_id INT PRIMARY KEY,
   flash_price DECIMAL(10,2) NOT NULL,
   start_time DATETIME NOT NULL,
   end_time DATETIME NOT NULL,
   quantity INT NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
   INDEX idx_time (start_time, end_time)
 );

 CREATE TABLE IF NOT EXISTS orders (
   id INT AUTO_INCREMENT PRIMARY KEY,
   shop_id INT NOT NULL,
   buyer_id INT NOT NULL,
   status ENUM('pending','paid','shipped','completed','cancelled') DEFAULT 'pending',
   total DECIMAL(10,2) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE,
   FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
   INDEX idx_shop_status (shop_id, status)
 );

 CREATE TABLE IF NOT EXISTS order_items (
   id INT AUTO_INCREMENT PRIMARY KEY,
   order_id INT NOT NULL,
   product_id INT NOT NULL,
   quantity INT NOT NULL,
   price DECIMAL(10,2) NOT NULL,
   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
   FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
   INDEX idx_order (order_id)
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
