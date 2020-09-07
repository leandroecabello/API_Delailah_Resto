const { Router } = require('express')
const ProductsController = require('../controllers/product.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')

const router = Router()

router
    .get('/', verifyToken, ProductsController.getAll)

    .post('/', verifyToken, verifyRole, ProductsController.add)

    .get('/:id', verifyToken, ProductsController.getById)

    .put('/:id', verifyToken, verifyRole, ProductsController.updateRegistry)

    .delete('/:id', verifyToken, verifyRole, ProductsController.deleteById)

module.exports = router    