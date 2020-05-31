const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    /* REVISAMOS SI HAY ERRORES */
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array()});
    }

    /* EXTRAEMOS EMAIL Y PASSWORD */
    const {email, password} = req.body;
    
    try {

        /* REVISAMOS QUE EL USUARIO REGISTRADO SEA UNICO */
        let usuario = await Usuario.findOne({ email });

        if( usuario ){
            return res.status(400).json({msg: 'El usuario ya existe.'});
        }

        /* CREAMOS EL NUEVO USUARIO */
        usuario = new Usuario(req.body);

        /* HASHEAMOS EL PASSWORD */
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        /* GUARDAMOS EL USUARIO */
        await usuario.save();

        /* CREAMOS Y FIRMAMOS EL JSON WEB TOKEN */
        const payload ={
            usuario: {
                id: usuario.id
            }
        };

        /* FIRMAMOS EL JWT */
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            res.json({ token });
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error', error);
    }

}

/* ANOTACIONES */
/*
 *  salt -> Crea resultados diferentes para la contraseña
 *  validation-result -> El resultado de la validacion que hicimos en usuarios.js
 *  este retorna un array, el cual vamos a validar si esta vacio o no.
 *  Las reglas de validacion van en el routing pero el resultado se lee en el controlador
 */