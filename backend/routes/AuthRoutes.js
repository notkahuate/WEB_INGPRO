const express = require("express");
const router = express.Router();
const verificarToken = require("../configures/Mildware");
const { loginUsuario } = require("../controllers/authcontroller");
const { forgotPassword } = require("../controllers/authcontroller");
const { resetPassword } = require("../controllers/authcontroller");
const AuthModel = require("../models/authModel");

router.post("/login", loginUsuario);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Obtener datos del usuario autenticado
router.get("/me", verificarToken, async (req, res) => {
    try {
        const user = await AuthModel.findById(req.userId);
        if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" });

        res.json({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            telefono: user.telefono,
            nombre_empresa: user.nombre_empresa,
            codigo_postal: user.codigo_postal,
            direccion: user.direccion,
            estado: user.estado_provincia,
            pais: user.pais,
            apellido: user.apellido,
            ciudad : user.ciudad
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error obteniendo usuario" });
    }
});

module.exports = router;
