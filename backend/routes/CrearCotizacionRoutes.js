const express = require("express");
const router = express.Router();
const CotizacionController = require("../controllers/CrearCotizacionController");

// Crear nueva cotización
router.post("/", CotizacionController.crear);

// Obtener todas las cotizaciones de un usuario
router.get("/usuario/:user_id", CotizacionController.obtenerPorUsuario);

// Obtener una cotización por ID específico
router.get("/:id", CotizacionController.obtenerPorId);

module.exports = router;