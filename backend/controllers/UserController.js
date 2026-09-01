const UserModel = require('../models/userModel');

const registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      password,
      telefono,
      pais,
      estado_provincia,
      direccion,
      nombreEmpresa,
      codigo_postal,
      ciudad
    } = req.body;

    if (!nombre || !apellido || !email || !password || !telefono ||
        !pais || !estado_provincia || !direccion || !nombreEmpresa || !codigo_postal || !ciudad) {
      return res.status(400).json({ mensaje: 'Faltan datos' });
    }

    const existe = await UserModel.usuarioExiste(email);
    if (existe) {
      return res.status(409).json({
        mensaje: '❌ El correo ya está registrado',
        error: 'email_existente'
      });
    }

    const nuevoUsuario = await UserModel.crearUsuario(
      nombre,
      apellido,
      email,
      password,
      telefono,
      pais,
      estado_provincia,
      direccion,
      nombreEmpresa,
      codigo_postal,
      ciudad
    );

    res.status(201).json({
      mensaje: '✅ Usuario registrado con éxito',
      usuario: nuevoUsuario
    });

  } catch (error) {
    console.error('❌ Error en registrarUsuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};


const restablecerPassword = async (req, res) => {
  try {
    const { email, nuevaPassword } = req.body;

    if (!email || !nuevaPassword) {
      return res.status(400).json({
        mensaje: 'Email y nueva contraseña son requeridos'
      });
    }

    const usuario = await UserModel.obtenerUsuarioPorEmail(email);

    if (!usuario) {
      return res.status(404).json({
        mensaje: '❌ El correo no está registrado'
      });
    }

    await UserModel.actualizarPasswordPorEmail(email, nuevaPassword);

    res.json({
      mensaje: '✅ Contraseña actualizada correctamente'
    });

  } catch (error) {
    console.error('❌ Error en restablecerPassword:', error);
    res.status(500).json({
      mensaje: 'Error al restablecer contraseña',
      error: error.message
    });
  }
};

const actualizarUsuario = async (req, res) => {
    try {
        const userId = req.userId; // 🔥 viene del token

        const datos = req.body;

        const usuarioActualizado = await UserModel.actualizarUsuario(userId, datos);

        res.json(usuarioActualizado);

    } catch (error) {
        res.status(500).json({ mensaje: "Error actualizando usuario" });
    }
};

module.exports = { registrarUsuario, restablecerPassword, actualizarUsuario };
