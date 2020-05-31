const express = require('express');
const app = express();

const connectDB = require('./config/db');

/* CONECTAR A LA BASE DE DATOS */
connectDB();

/* HABILITAMOS EXPRESS.JSON -> ANTERIORMENTE SE USABA EL BODY-PARSER */
app.use(express.json({extended: true}))

/* PUERTO DE LA APP */
const PORT = process.env.PORT || 4000;

/* IMPORTAMOS LAS RUTAS */
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));

/* ARRANCAMOS LA APP */
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});