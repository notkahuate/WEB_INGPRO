const { getLocalProducts } = require("../models/ProductModel");
const { getProductById } = require("../models/ProductModel");

async function listProducts(req, res) {
  try {
    res.set(
      "Cache-Control",
      "public, max-age=300, stale-while-revalidate=600"
    );
    const products = await getLocalProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error obteniendo productos desde la base de datos local:", error.message);
    res.status(500).json({
      message: "Error obteniendo productos desde la base de datos local",
      error: error.message,
    });
  }
}

async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error obteniendo producto:", error.message);
    res.status(500).json({
      message: "Error obteniendo producto desde la base de datos local",
      error: error.message,
    });
  }
}

module.exports = { listProducts, getProduct };