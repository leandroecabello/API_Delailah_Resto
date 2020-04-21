const ProductsService = require('../service/product.service')
const OrdersService = require('../service/order.service')
const { filterParams } = require('../middlewares/functions')

class OrdersController{

    static async getAll(req, res){

        try {
        
            const orders = await OrdersService.getAllDB()
            res.status(200).json(orders)
                
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        } 
    }

    static async getById(req, res) {

        const id = req.params.id
        
        try {
        
            const order = await OrdersService.getOneById(id)
            res.status(200).json(order)
                
        } catch (error) {
        
            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }   
    }

    static async add(req, res, next) {
        
        const userId = req.user.id

        try {
            const { date_time= new Date(), total, state = "nuevo", user_id = userId, paymentmethod, products } = req.body
            
            let montoTotal = 0             

            for (let data in products){
                let product = await ProductsService.getOneById(products[data].product_id)
                let subtotal = product[0].price * products[data].quantity
                montoTotal += subtotal
            }
                
            total = montoTotal
            let order = await OrdersService.store(date_time, total, state, user_id, paymentmethod)
            res.status(201).json({ msg: "Order created successfully", id: order.id })
        }
    
        catch (error) {

            res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
        }
    }

    static async updateRegistry(req, res) {
        
        const id = parseInt(req.params.id)
        
        if(!isNaN(id)) {
        
            try {
                const order = await OrdersService.getOneById(id)

                if (order[0]) {
                    const { state } = req.body
                    
                    const params = filterParams({ state })
                    const modifiedOrder = { ...order, ...params }
                    await OrdersService.setUpdate(id, modifiedOrder)
                    res.status(200).json({ message: `Order with id ${id} updated successfully.` })
                
                } else {
                 
                    res.status(404).json({ message: 'Not found id' });
                }
        
            } catch (error) {

                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
            }

        }else{

            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number' })
        }    
    }

    static async deleteById(req, res) {
        
        const id = parseInt(req.params.id)
        
        if(!isNaN(id)) {
        
            try {            
                const order = await OrdersService.getOneById(id)
                
                if (order[0]) {
                    
                    await OrdersService.deleteOneById(id)
                    res.status(200).json({ message: `Product with id ${id} was disabled correctly` });
                
                } else {
                
                    res.status(404).json({message: 'Not found id' });
                }

            } catch(error) {
                
                res.status(500).json({ error: 'Something went wrong. Please retry or contact with an admin.', message: error})
            }
            
        }else{

            res.status(402).send({ error: 'Bad request.', message: 'Id must be a number' })
        }   
    }
}

module.exports = OrdersController