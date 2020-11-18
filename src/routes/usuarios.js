const express = require('express');
const router = express.Router();
const login = require('../middleware/auth');

const UsuariosController = require('../controllers/UsuariosController');

router.post('/cadastro', login.obrigatorio, UsuariosController.postUsuario);
router.post('/login', UsuariosController.postLogin);

module.exports = router;
