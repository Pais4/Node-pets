const mongoose = require('mongoose');

const MascotaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    propietario: {
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
    },
    fechaCreacion: {
        type: Date,
            default: Date.now()
    }
});

module.exports = mongoose.model('Mascota', MascotaSchema);