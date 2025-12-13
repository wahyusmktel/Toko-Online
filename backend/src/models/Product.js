import { pool } from "../config/database.js";

export const ProductModel = {
  async createProduct({ shopId, name, price, stock, category, description }) {
    const [result] = await pool.query(
      "INSERT INTO products (shop_id, name, price, stock, category, description) VALUES (?, ?, ?, ?, ?, ?)",
      [shopId, name, price, stock, category || null, description || null]
    );
    return {
      id: result.insertId,
      shop_id: shopId,
      name,
      price,
      stock,
      category,
      description,
    };
  },

  async updateProduct(id, update) {
    const fields = [];
    const values = [];
    for (const [key, val] of Object.entries(update)) {
      fields.push(`${key} = ?`);
      values.push(val);
    }
    values.push(id);
    await pool.query(
      `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  async listByShop(shopId) {
    const [rows] = await pool.query(
      "SELECT p.*, fs_item.flash_price, fs_item.start_time, fs_item.end_time FROM products p LEFT JOIN flash_sale_items fs_item ON fs_item.product_id = p.id WHERE p.shop_id = ? ORDER BY p.created_at DESC",
      [shopId]
    );
    return rows;
  },
};
