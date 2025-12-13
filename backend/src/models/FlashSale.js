import { pool } from "../config/database.js";

export const FlashSaleModel = {
  async setProductFlashSale({
    productId,
    flashPrice,
    startTime,
    endTime,
    quantity,
  }) {
    // Upsert into flash_sale_items
    await pool.query(
      `INSERT INTO flash_sale_items (product_id, flash_price, start_time, end_time, quantity)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE flash_price = VALUES(flash_price), start_time = VALUES(start_time), end_time = VALUES(end_time), quantity = VALUES(quantity)`,
      [productId, flashPrice, startTime, endTime, quantity]
    );
    const [rows] = await pool.query(
      "SELECT * FROM flash_sale_items WHERE product_id = ?",
      [productId]
    );
    return rows[0];
  },

  async removeProductFlashSale(productId) {
    await pool.query("DELETE FROM flash_sale_items WHERE product_id = ?", [
      productId,
    ]);
    return { success: true };
  },
};
