// Update with your config settings.
require('dotenv/config')

module.exports = {
  development: {
    client: process.env.BD_CLIENTE,
    connection: {
      host : process.env.BD_HOST,
      port: Number(process.env.BD_PORTA),
      user : process.env.BD_USUARIO,
      password : process.env.BD_SENHA,
      database : process.env.BD_DATABASE
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }

}

