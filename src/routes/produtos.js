const express = require('express');
const router = express.Router();
const login = require('../middleware/auth');

const ProdutosController = require('../controllers/ProdutosController')

router.post('/', login.obrigatorio, ProdutosController.postProduto);
router.get('/', ProdutosController.getProduto);
router.get('/:id_produto', ProdutosController.getUmProduto);
router.patch('/', login.obrigatorio, ProdutosController.patchProduto);
router.delete('/', login.obrigatorio, ProdutosController.deleteProduto);

module.exports = router;
