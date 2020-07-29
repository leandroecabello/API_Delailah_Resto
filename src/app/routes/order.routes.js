const { Router } = require('express')
const OrdersController = require('../controllers/order.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')
const router = Router()

router
    .get('/', verifyToken, verifyRole, async(req, res) => {
        await OrdersController.getAll(req, res)
    })
    .post('/', verifyToken, async(req, res) => {
        await OrdersController.add(req, res)
    })
    .get('/:id', verifyToken, verifyRole, async(req, res) => {
        await OrdersController.getById(req, res)
    })
    .put('/:id', verifyToken, verifyRole, async(req, res) => {
        await OrdersController.updateRegistry(req, res)
    })
    .delete('/:id', verifyToken, verifyRole, async(req, res) => {
        await OrdersController.deleteById(req, res)
    })

module.exports = router
