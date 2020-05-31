const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {

    /* REVISAMOS SI HAY ERRORES */
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        return res.status(400).json({errores: errores.array()});
    }

    /* EXTRAEMOS EL EMAIL Y EL PASS DEL REQ */
    const { email, password } = req.body;
    
    try {

        /* REVISAMOS QUE SEA UN USUARIO REGISTRADO */
        let usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({msg:'El usuario no existe.'});
        }

        /* REVISAMOS EL PASSWORD */
        const passCorrecta = await bcrypt.compare(password, usuario.password);
        if(!passCorrecta){
            return res.status(400).json(
                { msg:'Password Incorrecta.' }
            )
        }

        /* SI TODO ES CORRECTO CREAMOS EL TOKEN */
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
    }

}