const { Router } = require('express')
const ProductsController = require('../controllers/product.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')

const router = Router()

router
    .get('/', verifyToken, async (req, res) => {
        await ProductsController.getAll(req, res)
    }) 
    .post('/', verifyToken, verifyRole, async (req, res) => {
        await ProductsController.add(req, res)
    })
    .get('/:id', verifyToken, async (req, res) => {
        await ProductsController.getById(req, res)
    })
    .put('/:id', verifyToken, verifyRole, async (req, res) => {
        await ProductsController.updateRegistry(req, res)
    })
    .delete('/:id', verifyToken, verifyRole, async (req, res) => {
        await ProductsController.deleteById(req, res)
    })

module.exports = router    