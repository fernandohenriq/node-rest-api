const options = require('../config/knexfile')[process.env.ENVIRONMENT || 'development'];
const knex = require('knex')(options);

// INSERE UM PEDIDO
exports.postPedidos = async (req, res, next) => {
  try {
    const idPedido = await knex('pedidos')
    .insert({
      id_produto: req.body.id_produto,
      quantidade: req.body.quantidade
    }).returning('id_pedido');
    
    return res.status(201).send({
      mensagem: 'Pedido inserirdo com sucesso',
      idProduto: idPedido
    });

  } catch (err) {
    return res.status(500).send({
      error: err
    });
  }
}

// RETORNA TODOS OS PEDIDOS
exports.getPedidos = async (req, res, next) => {
  try {
    const pedidos = await knex('pedidos')
    .innerJoin('produtos','pedidos.id_produto','produtos.id_produto')
    .select('*');
    
    if (pedidos.length === 0) {
      return res.status(404).send({
        mensagem: "Não há registros de pedidos",
        total: pedidos.length,
        pedidos: {
          id_pedido: pedidos
        }
      });
    }

    return res.status(202).send({
        message: "Lista de pedidos retornado com sucesso",
        total: pedidos.length,
        pedidos: pedidos
    });
  } catch (err) {
    return res.status(500).send({
      error: err
    });
  }
}

// RETORNA OS DADOS DE UM PEDIDO
exports.getUmPedidos = async (req, res, next) => {
  try {
    const pedido = await knex('pedidos')
    .where('id_pedido','=',req.params.id_produto)
    .select('*');

    if (produto.length === 0) {
      return res.status(404).send({
        total: pedido.length,
        produto: pedido
      });
    }

    return res.status(202).send({
      total: pedido.length,
      produto: pedido
    });
  } catch (err) {
    return res.status(500).send({
      error: err
    });
  }
}

// EXCLUI UM PEDIDO
exports.deletePedido = async (req, res, next) => {
  try {
    await knex('pedidos')
    .where('id_pedido','=',req.body.id_pedido)
    .delete();

    return res.status(202).send({
      mensagem: 'Pedido excluído com sucesso.'
    });

  } catch (err) {
    return res.status(500).send({
      error: err
    });
  }
}
