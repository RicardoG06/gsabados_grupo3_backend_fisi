const Perritos = require('../models/perritos');
const storage = require('../utils/cloud_storage')

module.exports = {
    async getAll(req,res,next){
        try{
            const data = await Perritos.getAll();
            console.log(`Perritos: ${data}`);
            return res.status(201).json(data);
        }
        catch(error){
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los perritos'
            });
        }  

    },

    async register(req,res,next){
        try {

            let perrito = JSON.parse(req.body.perrito)
            const files = req.files;
            console.log(files)

            
            if(files.length > 0){  //CLIENTE NOS ENVIA UN ARCHIVO
                const pathImage = `image_${Date.now}`; //NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage)

                if(url != undefined && url != null){
                    perrito.image = url
                    
                }
            }

            data = await Perritos.create(perrito);


            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data:perrito
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del perrito',
                error: error
            });
        }
    }
}