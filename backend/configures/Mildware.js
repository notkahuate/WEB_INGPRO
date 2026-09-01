const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
    const header = req.headers["authorization"];

    if (!header) {
        return res.status(403).json({ mensaje: "Token requerido" });
    }

    const partes = header.split(" ");
    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return res.status(400).json({ mensaje: "Formato de token incorrecto" });
    }

    const token = partes[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: "Token inválido o expirado" });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = verificarToken;
