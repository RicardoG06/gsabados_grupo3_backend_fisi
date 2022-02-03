const User = require('../models/user');
const Rol_ad_us = require('../models/rol_ad_usu')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage')

module.exports = {
    async getAll(req,res,next){
        try{
            const data = await User.getAll();
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

    async register(req,res,next){
        try {
            const user = req.body;
            const data = await User.create(user);

            await Rol_ad_us.create(data.id, 1);

            const token = jwt.sign({ id: data.id, email: user.email }, keys.secretOrKey, {
                // expiresIn:
            })

            const myData = {
                id: data.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                dni: user.dni,
                edad: user.edad,
                phone: user.phone,
                image: user.image,
                session_token: `JWT ${token}`
            };

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data:myData
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

    async login(req,res,next){
        try {
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                })
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password)

            if(isPasswordValid){
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {
                    // expiresIn:
                })

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    dni: myUser.dni,
                    edad: myUser.edad,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.rol,
                    perritos: myUser.perr
                };

                await User.updateSessionToken(myUser.id, `JWT ${token}`);

                return res.status(201).json({
                    success: true,
                    message: 'El usuario a sido autenticado',
                    data: data
                })
            }
            else{
                return res.status(201).json({
                    success: false,
                    message: 'La contraseña es incorrecta',
                    data: data
                })
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el login del usuario',
                error: error
            });
        }
    },


    async ValidacionRegistro(req,res,next){
        try {
            const email = req.body.email;

            const myUser = await User.findByEmail(email);

            if(!myUser){
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                })
            }

                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {
                    // expiresIn:
                })

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    dni: myUser.dni,
                    edad: myUser.edad,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.rol,
                    perritos: myUser.perr
                };

                console.log(`USUARIO ENVIADO ${data}`);

                return res.status(201).json({
                    success: true,
                    message: 'El usuario a sido autenticado',
                    data: data
                })
    }   
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el login del usuario',
                error: error
            });
        }
    },

    async update(req,res,next){
        try {
            console.log('Usuario', req.body.user)
            const user = JSON.parse( req.body.user); // CLIENTE DEBE ENVIARNOS UN OBJETO USER
            console.log('Usuario Parseado', user)

            const files = req.files;

            var random = Math.floor(Math.random() * (100000 - 1)) + 1

            console.log(files)

            if(files.length > 0){ //CLIENTE NOS ENVIA UN ARCHIVO
                const pathImage = `image_${random}`; //NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if(url != undefined && url != null){
                    user.image = url
                }
            }

            await User.update(user); //GUARDANDO LA URL EN LA BD

            return res.status(201).json({
                success: true,
                message: 'Los datos se han actualizado correctamente',
                data: user
            });


        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar los datos del usuario',
                error: error
        });

        }
    }
};