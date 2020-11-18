const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const UsuariosController = require('../controllers/UsuariosController');

router.post('/cadastro', login.obrigatorio, UsuariosController.postUsuario);
router.post('/login', UsuariosController.postLogin);

module.exports = router;
