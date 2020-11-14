const express = require('express')
const router = express.Router()
const options = require('../knexfile')[process.env.ENVIRONMENT || 'development']
const knex = require('knex')(options)

// INSERE UM PRODUTO
router.post('/', async (req, res, next) => {
  
  try {
    
    const prod = await knex('produtos')
      .insert({
        nome: req.body.nome,
        preco: req.body.preco
      })
      .returning('*')
    
    res.status(201).send({
      mensagem: 'Produto inserirdo com sucesso',
      idProduto: prod[0].id_produto
    })
  } catch (error) {
    res.status(500).send({
      error: error,
      response: null
    })
  }
})

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Retorna todo os produtos'
  })
})


// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
  const id = req.params.id_produto

  if (id === 'especial'){
    res.status(200).send({
      mensagem: 'Você descobriu o id especial',
      id: id,
    })
  } else {
    res.status(200).send({
      mensagem: 'Você passou um ID'
    })
  }
})

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Produto alterado'
  })
})

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Produto excluído'
  })
})

module.exports = router