const Cotizacion = require("../models/CrearCotizacion");

module.exports = {
  crear: async (req, res) => {
    try {
     let { user_id, productos, estado, total_productos, codigo_oportunidad} = req.body;


      // 🔥 ARREGLA PROBLEMA: productos viene como STRING → convertirlo
      if (typeof productos === "string") {
        try {
          productos = JSON.parse(productos);
        } catch (e) {
          console.error("JSON inválido:", productos);
          return res.status(400).json({ error: "Formato de JSON inválido en productos" });
        }
      }

      if (!Array.isArray(productos)) {
        return res.status(400).json({ error: "productos debe ser un array válido" });
      }

      // ⭐ Si NO envías total_productos → se calcula automáticamente
      if (!total_productos) {
        total_productos = productos.reduce((sum, p) => sum + (p.cantidad || 1), 0);
      }

      const nueva = await Cotizacion.crearCotizacion({
        user_id,
        productos,
        total_productos,
        estado: estado || "pendiente",
        codigo_oportunidad
      });


      res.status(201).json(nueva);

    } catch (error) {
      console.error("Error al crear cotización:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  obtenerPorUsuario: async (req, res) => {
    try {
      const { user_id } = req.params;

      if (!user_id || user_id === "undefined" || user_id === "null") {
        return res.status(400).json({ error: "user_id es requerido" });
      }

      const data = await Cotizacion.obtenerCotizacionesPorUsuario(user_id);
      return res.status(200).json(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener cotizaciones:", error);
      const status = error.status || 500;
      return res.status(status).json({
        error: "Error interno del servidor",
        detail: error.message || String(error),
      });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Cotizacion.obtenerCotizacionPorId(id);
      if (!data) {
        return res.status(404).json({ error: "Cotización no encontrada" });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error al obtener cotización:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
        detail: error.message || String(error),
      });
    }
  }
};
