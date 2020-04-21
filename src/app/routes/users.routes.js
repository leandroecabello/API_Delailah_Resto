const { Router } = require('express')
const UsersController = require('../controllers/user.controller')
const { verifyToken, verifyRole } = require('../middlewares/auth.middleware')
const router = Router()

router
    .get('/', verifyToken, verifyRole, async (req, res) => {
        await UsersController.getAll(req, res)
    }) 
    .post('/', async (req, res) => {
        await UsersController.add(req, res)
    })
    .get('/:id', verifyToken, verifyRole, async (req, res) => {
        await UsersController.getById(req, res)
    })
    .put('/:id', verifyToken, verifyRole, async (req, res) => {
        await UsersController.updateRegistry(req, res)
    })
    .delete('/:id', verifyToken, verifyRole, async (req, res) => {
        await UsersController.deleteById(req, res)
    })

module.exports = router    