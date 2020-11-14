const express = require('express')
const router = express.Router()
const options = require('../knexfile')[process.env.ENVIRONMENT || 'development']
const knex = require('knex')(options)

// INSERE UM PRODUTO
router.post('/', async (req, res, next) => {
  
  try {
    const idProdudo = await knex('produtos')
      .insert({
        nome: req.body.nome,
        preco: req.body.preco
      })
      .returning('id_produto')
      
    return res.status(201).send({
      mensagem: 'Produto inserirdo com sucesso',
      idProduto: idProdudo
    })

  } catch (err) {
    return res.status(500).send({
      error: err
    })
  }
})

// RETORNA TODOS OS PRODUTOS
router.get('/', async (req, res, next) => {
  try {
    const produtos = await knex('produtos')
    .select('*')

    if (produtos.length === 0) {
      return res.status(404).send({
        mensagem: "Não há registros de produto",
        request: {
          total: produtos.length,
          produtos: produtos
        }
      })
    }
    
    return res.status(202).send({
      message: "Lista de produtos retornado com sucesso",
      request: {
        total: produtos.length,
        produtos: produtos
      }
    })

  } catch (err) {
    return res.status(500).send({
      error: err
    })
  }
})


// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', async (req, res, next) => {
  
  try {
    const produto = await knex('produtos')
    .where('id_produto','=',req.params.id_produto)
    .select('*')

    if (produto.length === 0) {
      return res.status(404).send({
        total: produto.length,
        produto: produto,
        query: req.params
      })
    }
    return res.status(202).send({
      total: produto.length,
      produto: produto,
      query: req.params
    })
  } catch (err) {
    return res.status(500).send({
      error: err
    })
  }
})

// ALTERA UM PRODUTO
router.patch('/', async (req, res, next) => {
  try {
    await knex('produtos')
    .where('id_produto','=',req.body.id_produto)
    .update({
      nome: req.body.nome,
      preco: req.body.preco
    })
    return res.status(202).send({
      mensagem: 'Produto alterado com sucesso.'
    })
  } catch (err) {
    return res.status(500).send({
      error: err
    })
  }
})

// EXCLUI UM PRODUTO
router.delete('/', async (req, res, next) => {
  try {
    await knex('produtos')
    .where('id_produto','=',req.body.id_produto)
    .delete()
    return res.status(202).send({
      mensagem: 'Produto excluído com sucesso.'
    })
  } catch (err) {
    return res.status(500).send({
      error: err
    })
  }
})

module.exports = router