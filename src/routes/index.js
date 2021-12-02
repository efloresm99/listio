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


//Primero estarán los endpoints de la API


//                      Usuarios (o simulación de usuarios)

//Verificar si el usuario existe con el nombre de usuario
router.get('/api/users/:username', (req, res) => {
    const {username} = req.params;
    const queryUser = `SELECT iduser FROM users WHERE username = '${username}'`;
    conexion.query(queryUser, (error, result) => {
        let response = {}; //Este objeto será el que devolverán todos los endpoints de las APIs
        if (error) throw error;

        if (result.length > 0){
            response.responseCode = 1;
            response.message = "Usuario encontrado";
            response.items = result;
        } else{
            response.responseCode = 0;
            response.message = "Usuario no encontrado";
            response.items = {}
        }

        //Devolver datos
        res.json(response);
    })
});



module.exports = router;