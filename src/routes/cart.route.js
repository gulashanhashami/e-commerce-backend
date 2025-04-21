import express from "express";
import { create } from "../controllers/cart.controller.js";
const router = express.Router();

// create the cart data
router.post("/create", create);

export default router;