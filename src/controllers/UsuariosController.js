const options = require('../../knexfile')[process.env.ENVIRONMENT || 'development'];
const knex = require('knex')(options);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// CRIA UM USUARIO
exports.postUsuario = async (req, res, next) => {
  try {
    const userExist = await knex('usuarios')
    .where('email','=',req.body.email)
    .select('email');

    if (userExist.length > 0) {
      return res.status(401).send({
        mensagem: "Usuário já cadastrado"
      });
    }

    bcrypt.hash(req.body.senha, 10, async (errBcrypt, hash) => {

      if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }

      await knex('usuarios').insert({
        emaill: req.body.email,
        senha: hash
      }).returning('id_usuario')

      return res.status(201).send({
        mensagem: "Usuário criado com sucesso",
        usuarioCriado: {
          id_usuario: r[0],
          email: req.body.email
        }
      });

    })
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}

// AUTENTICA USUARIO
exports.postLogin = async (req, res, next) => {
  try {
    const user = await knex('usuarios')
    .where('email','=',req.body.email)
    .select('*');
    
    if (user < 1) { return res.status(401).send({ mensagem: "Falha na autenticação" }); }

    bcrypt.compare(req.body.senha, user[0].senha, (err, result) => {
      if (err || !result) return res.status(401).send({ mensagem: "Falha na autenticação" });
      const token = jwt.sign({
        id_usuario: user[0].id_usuario,
        email: user[0].email
      }, process.env.JWT_KEY, {
        expiresIn: "12h"
      });

      return res.status(200).send({
        mensagem: "Autenticado com sucesso",
        token: token
      });
    })
  } catch (err) {
    return res.status(500).send({ error: err });
  }
}
