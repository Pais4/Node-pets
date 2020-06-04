const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasController');
const auth = require('../middleware/auth');

/* CREA UNA MASCOTA */
/* API/PROYECTOS */
router.post('/',
    auth,
    mascotasController.crearMascota
)

module.exports = router;