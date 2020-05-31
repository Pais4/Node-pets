const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB conectada');
    } catch (error) {
        console.error(error);
        process.exit(1); // EN CASO DE QUE HAYA UN ERROR EN LA CONEXION DETENER LA APP
    }
}

module.exports = connectDB;