const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const AuthModel = require("../models/authModel");

// Tiempo para bloquear intentos fallidos
let intentosFallidos = {};
const MAX_INTENTOS = 5;
const TIEMPO_BLOQUEO_MS = 5 * 60 * 1000; // 5 minutos

const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔐 Validar datos
    if (!email || !password) {
      return res.status(400).json({ mensaje: "Datos incompletos" });
    }

    // ⛔ Revisar si el usuario está bloqueado
    if (intentosFallidos[email] && Date.now() < intentosFallidos[email].bloqueadoHasta) {
      return res.status(429).json({ mensaje: "Demasiados intentos, intenta más tarde" });
    }

    const usuario = await AuthModel.findByEmail(email);
    const passwordHash = usuario?.password_hash;

    // Validación general (para no revelar si existe o no)
    if (!usuario || !await bcrypt.compare(password, passwordHash)) {

      // Registrar intento fallido
      if (!intentosFallidos[email]) {
        intentosFallidos[email] = { contador: 1 };
      } else {
        intentosFallidos[email].contador++;
      }

      // Bloquear si supera el límite
      if (intentosFallidos[email].contador >= MAX_INTENTOS) {
        intentosFallidos[email].bloqueadoHasta = Date.now() + TIEMPO_BLOQUEO_MS;
      }

      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    // Si el login es exitoso → limpiar intentos fallidos
    delete intentosFallidos[email];

    // 🔐 Generar JWT
    const token = jwt.sign(
      { userId: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};



/* =========================================
   📧 FORGOT PASSWORD
========================================= */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await AuthModel.findByEmail(email);

    // Siempre responder igual
    if (!user) {
      return res.json({
        mensaje: "Si el correo existe, se enviará un enlace"
      });
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_RESET_SECRET,
      { expiresIn: "15m" }
    );

    const resetUrl =
      `${process.env.FRONT_URL}/reset-password.html?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Soporte" <${process.env.MAIL_USER}>`,
      to: user.email,
      subject: "Restablecer contraseña",
      html: `
        <h3>Restablecer contraseña</h3>
        <p>Haz clic en el siguiente enlace:</p>
        <a href="${resetUrl}">Cambiar contraseña</a>
        <p>Este enlace expira en 15 minutos.</p>
      `
    });

    res.json({ mensaje: "Correo enviado si existe el usuario" });

  } catch (error) {
    console.error("Forgot password:", error);
    res.status(500).json({ mensaje: "Error enviando correo" });
  }
};

/* =========================================
   🔁 RESET PASSWORD
========================================= */
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ mensaje: "Datos incompletos" });
    }

    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    const user = await AuthModel.findByEmail(decoded.email);

    if (!user) {
      return res.status(400).json({ mensaje: "Token inválido" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await AuthModel.updatePassword(decoded.email, passwordHash);

    res.json({ mensaje: "Contraseña actualizada correctamente" });

  } catch (error) {
    console.error("Reset password:", error);
    res.status(400).json({ mensaje: "Token expirado o inválido" });
  }
};

module.exports = {
  loginUsuario,
  forgotPassword,
  resetPassword
};