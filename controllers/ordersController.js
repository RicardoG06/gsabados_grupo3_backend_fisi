const { findByClientAndStatus } = require('../models/order');
const Order = require('../models/order')

module.exports = {

    async findByStatus(req,res,next){

        try{
            const status = req.params.status;
            const data = await Order.findByStatus(status);
            console.log(`Status ${JSON.stringify(data)}`);
            return res.status(201).json(data);

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.Status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })

        }

    },

    async findByClientAndStatus(req,res,next){

        try{
            const status = req.params.status;
            const id_user = req.params.id_user;
            const data = await Order.findByClientAndStatus(id_user, status);
            return res.status(201).json(data);

        }
        catch (error) {
            console.log(`Error ${error}`);
            return res.Status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })

        }

    },



    async create(req, res, next) {

        try{

            let order = req.body;
            order.status = 'PAGADO';
            const data = await Order.create(order);

            return res.status(201).json({
                success: true,
                message: 'La orden se creo correctamente',
                data: {
                    'id' : data.id
                }
            });

        }
        catch(error){
            console.log(`Error ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la orden',
                error: error
            });
        }
    }


}