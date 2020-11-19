# node-rest-api
A simple RESTful API using NodeJS, Express and Knex

## Instalation
First of all, install dependences
```
npm install
```
Starting the application
```
npm start
```

## Configurations
Define the following variables in your environment
```
JWT_KEY=

BD_CLIENTE=
BD_HOST=
BD_PORTA=
BD_USUARIO=
BD_SENHA=
BD_DATABASE=
```
* <strong>JWT_KEY</strong>: Key used to encrypt the *header* and the *payload*
* <strong>BD_*</strong>: Database connection configuration

## Endpoints
* <strong>POST /usuarios/cadastro:</strong> Will create a new user **
* <strong>POST /usuarios/login:</strong> Will authentic the user returning a token
* <strong>POST /produtos:</strong> Will create a new product **
* <strong>GET /produtos:</strong> Will return all products 
* <strong>GET /produtos/[id_produto]:</strong> Will return the product with the given id
* <strong>PATCH /produtos:</strong> will update the product with the given id in the request body **
* <strong>DELETE /produtos:</strong> will delete the product defined in the request body **
* <strong>POST /pedidos:</strong> Will create a new order **
* <strong>GET /pedidos:</strong> Will return all orders
* <strong>GET /pedidos/[id_pedido]:</strong> Will return the order with the given id
* <strong>DELETE /pedidos:</strong> will delete the order defined in the request body **
** Token required to authenticate

## Future iprovements
* Change everything in english
* Create database migration
* Create database seeds
* More

## Step-by-step
This application is my implementation of this <string>[tutorial](https://youtu.be/hAAj27hgPFg)</strong>
