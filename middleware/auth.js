const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){

    /* LEEMOS EL TOKEN DEL HEADER */
    const token = req.header('x-auth-token');

    /* REVISAMOS SI NO EXISTE EL TOKEN */
    if(!token){
        return res.status(401).json(
            { msg: 'No existe token, permiso invalido' }
        )
    }

    /* VALIDAMOS EL TOKEN */
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json(
            { msg: 'Token no valido' }
        )
    }
}

/* ANOTACIONES */
/*
 *  next() -> Usamos next para que se vaya al siguiente middleware.
 *  
 */