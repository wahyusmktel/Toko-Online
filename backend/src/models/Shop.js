import { pool } from "../config/database.js";

export const ShopModel = {
  async createShop({ ownerId, name, description }) {
    const [result] = await pool.query(
      "INSERT INTO shops (owner_id, name, description) VALUES (?, ?, ?)",
      [ownerId, name, description || null]
    );
    return { id: result.insertId, owner_id: ownerId, name, description };
  },

  async getShopById(id) {
    const [rows] = await pool.query("SELECT * FROM shops WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async listShopsByOwner(ownerId) {
    const [rows] = await pool.query(
      "SELECT * FROM shops WHERE owner_id = ? ORDER BY created_at DESC",
      [ownerId]
    );
    return rows;
  },
};
