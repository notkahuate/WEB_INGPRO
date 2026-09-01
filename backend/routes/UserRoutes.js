const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  restablecerPassword,
  actualizarUsuario
} = require('../controllers/UserController');

const verificarToken = require('../configures/Mildware');

console.log('📁 Archivo UserRoutes.js cargado');
router.post('/register', (req, res, next) => {
  console.log('📨 POST /api/users/register recibido');
  next();
}, registrarUsuario);


router.put('/reset-password', restablecerPassword);
router.put('/update', verificarToken, actualizarUsuario);
module.exports = router;