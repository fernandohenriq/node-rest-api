const express = require('express');
const router = express.Router();
const login = require('../middleware/auth');

const PedidosController = require('../controllers/PedidosController');

router.post('/', login.obrigatorio, PedidosController.postPedidos);
router.get('/', PedidosController.getPedidos);
router.get('/:id_pedido', PedidosController.getUmPedidos);
router.delete('/', login.obrigatorio, PedidosController.deletePedido);

module.exports = router;
