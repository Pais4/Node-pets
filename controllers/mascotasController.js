const Mascota = require('../models/Mascota');

exports.crearMascota = async (req, res) => {
    try {

        /* CREAMOS UNA NUEVA MASCOTA */
        const mascota = new Mascota(req.body);
        mascota.save();
        res.json(mascota);

    } catch (error) {

        console.log(error);
        res.status(500).send('Hubo un error');

    }
}