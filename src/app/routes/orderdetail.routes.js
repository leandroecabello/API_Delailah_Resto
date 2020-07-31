const { Router } = require('express')
const OrderDetailController = require('../controllers/orderdetail.controller')

const router = Router()

router  
    .get('/', async (req, res) => {
        await OrderDetailController.getAll(req, res)
    })

    .get('/:order_id', async(req, res) => {
        await OrderDetailController.getById(req, res)
    })

module.exports = router