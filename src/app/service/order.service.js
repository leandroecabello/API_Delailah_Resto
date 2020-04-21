const sequelize = require('../../server')

class OrdersService {
    
    static async getAllDB(){
        return await sequelize.query('SELECT * FROM orders', {
            type: sequelize.QueryTypes.SELECT
        });       
    }
    
    static async getOneById(id) {
        return await sequelize.query('SELECT * FROM orders WHERE id = ?' , {
            replacements: [ id ],
            type: sequelize.QueryTypes.SELECT
        });
    }

    static async store(date_time, total, state, user_id, paymentmethod, product) {
     
        let order
        await sequelize.query('INSERT INTO orders  VALUES  (null, ?, ?, ?, ?, ?)',
            { replacements: [date_time, total, state, user_id, paymentmethod] })
            .then(function (results) {
                order = results[0]
            })
            for(let data in product){
                await sequelize.query('INSERT INTO orderdetail (id_product, id_order, quantity) VALUES (?, ?, ?)',
                    { replacements: [data.id, order, data.quantity] })
        }
        return order
    }

    static async setUpdate(id, orders) {
        return await sequelize.query(
            `UPDATE orders SET 
            state = ?   
            WHERE id = ?`,
            {
                replacements: [
                    orders.state,
                    id
                ]
            })
        }

    static async deleteOneById(id) {
        return await sequelize.query('DELETE FROM orders WHERE id = ?', {
            replacements: [id]
        })
    }
}

module.exports = OrdersService

