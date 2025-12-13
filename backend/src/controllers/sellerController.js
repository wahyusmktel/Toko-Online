import { validationResult, body } from "express-validator";
import { ShopModel } from "../models/Shop.js";
import { ProductModel } from "../models/Product.js";
import { FlashSaleModel } from "../models/FlashSale.js";

export const validateCreateShop = [
  body("name")
    .isString()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Nama toko minimal 2 karakter"),
  body("description").optional().isString().trim(),
];

export const validateCreateProduct = [
  body("name").isString().trim().isLength({ min: 2 }),
  body("price").isFloat({ gt: 0 }),
  body("stock").isInt({ min: 0 }),
  body("category").optional().isString().trim(),
  body("description").optional().isString().trim(),
];

export const validateFlashSale = [
  body("flashPrice").isFloat({ gt: 0 }),
  body("startTime").isISO8601(),
  body("endTime").isISO8601(),
  body("quantity").isInt({ min: 1 }),
];

function handleValidation(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Validasi gagal",
        error: errors.array(),
      });
  }
}

export async function createShop(req, res, next) {
  try {
    const err = handleValidation(req, res);
    if (err) return; // response already sent
    const ownerId = req.user.id;
    const { name, description } = req.body;
    const shop = await ShopModel.createShop({ ownerId, name, description });
    res.json({ success: true, data: shop });
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const err = handleValidation(req, res);
    if (err) return;
    const { id: shopId } = req.params;
    const { name, price, stock, category, description } = req.body;
    const product = await ProductModel.createProduct({
      shopId,
      name,
      price,
      stock,
      category,
      description,
    });
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}

export async function listShopProducts(req, res, next) {
  try {
    const { id: shopId } = req.params;
    const products = await ProductModel.listByShop(shopId);
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await ProductModel.updateProduct(id, req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
}

export async function setProductFlashSale(req, res, next) {
  try {
    const err = handleValidation(req, res);
    if (err) return;
    const { id: productId } = req.params;
    const { flashPrice, startTime, endTime, quantity } = req.body;
    const fs = await FlashSaleModel.setProductFlashSale({
      productId,
      flashPrice,
      startTime,
      endTime,
      quantity,
    });
    res.json({ success: true, data: fs });
  } catch (error) {
    next(error);
  }
}

export async function removeProductFlashSale(req, res, next) {
  try {
    const { id: productId } = req.params;
    const result = await FlashSaleModel.removeProductFlashSale(productId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
