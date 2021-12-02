//Inicializar dependencias
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//Crear conexión a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'listio'
});


//Conectar y verificar la conexión de la base de datos
conexion.connect(error => {
    if (error) throw error;
    console.log('Base de datos conectada correctamente');
});


//Seguramente hay mejores prácticas para la lógica de desarrollo que tiene cada ruta (como controladores)
//Sin embargo, por ahora, la lógica de la app estará aquí.




module.exports = router;