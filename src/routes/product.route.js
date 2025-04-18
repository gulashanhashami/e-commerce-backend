import express from "express";
import { create, list, handleWishlist } from "../controllers/product.controler.js";
const router = express.Router();

// create the product data
router.post("/create", create);

// get the product data list
router.get("/list", list);

// handle wishlist for a perticular user
router.post("/wishlist", handleWishlist);

export default router;