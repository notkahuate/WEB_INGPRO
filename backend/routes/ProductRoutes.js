const express = require("express");
const router = express.Router();
const { listProducts } = require("../controllers/ProductController");
const { getProduct } = require("../controllers/ProductController");

// GET /api/products
router.get("/", listProducts);
router.get("/:id", getProduct);

module.exports = router;
