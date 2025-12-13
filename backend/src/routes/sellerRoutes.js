import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  validateCreateShop,
  validateCreateProduct,
  validateFlashSale,
  createShop,
  createProduct,
  listShopProducts,
  updateProduct,
  setProductFlashSale,
  removeProductFlashSale,
} from "../controllers/sellerController.js";

const router = express.Router();

router.use(authenticateToken);

// Shops
router.post("/shops", validateCreateShop, createShop);
router.get("/shops/:id/products", listShopProducts);
router.post("/shops/:id/products", validateCreateProduct, createProduct);

// Products
router.put("/products/:id", updateProduct);

// Flash sale
router.post("/products/:id/flash-sale", validateFlashSale, setProductFlashSale);
router.delete("/products/:id/flash-sale", removeProductFlashSale);

export default router;
