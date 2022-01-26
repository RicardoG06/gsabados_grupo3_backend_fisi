const Trabajador = require('../models/trabajador');
const Rol_pa_cu = require('../models/rol_pa_cu');

module.exports = {
    async getAll(req,res,next){
        try{
            const data = await Trabajador.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }  

    },

    async findByrol(req, res, next){
        try{
            const id_rol = req.params.id_rol;
            const data = await Trabajador.findByrol(id_rol);

            return res.status(201).json(data);
        }catch{
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al traer el trabajador por su rol',
                error: error
            });
        }
    },


    async register(req,res,next){
        try {
            const user = req.body;
            const data = await Trabajador.create(user);

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: {
                    'id': data.id
                }
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error
            });
        }
    },
    
};