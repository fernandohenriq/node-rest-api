const express = require('express');
const router = express.Router();

const UsuariosController = require('../controllers/UsuariosController');

router.post('/cadastro', UsuariosController.postUsuario);
router.post('/login', UsuariosController.postLogin);

module.exports = router;
