const express = require('express')
const bodyParser = require('body-parser')
const loginRoutes = require('./routes/login.routes')
const userRoutes = require('./routes/users.routes')
const productRoutes = require('./routes/products.routes')
const ordersRoutes = require('./routes/order.routes') 

const app = express()

app
	.use(bodyParser.json())
	.use('/login', loginRoutes)
	.use('/users', userRoutes)   
	.use('/products', productRoutes)
	.use('/orders', ordersRoutes)
	
module.exports = app 