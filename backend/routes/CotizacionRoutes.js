const express = require("express");
const router = express.Router();

const { enviarCotizacion } = require("../controllers/CotizacionController");
const { buscarEmpresaPorCorreo } = require("../controllers/CotizacionController");
const { sincronizarEstados } = require("../controllers/CotizacionController");

router.post("/cotizacion", enviarCotizacion);


// Ruta para buscar empresa por correo
router.post("/buscar_empresa_por_correo", buscarEmpresaPorCorreo);

router.post("/sincronizar_estados", async (req, res) => {
  try {
    await sincronizarEstados();
    res.json({ mensaje: "Sincronización completada" });
  } catch (error) {
    res.status(500).json({ error: "Error al sincronizar" });
  }
});


module.exports = router;


