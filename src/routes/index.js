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

//Función que construye el objeto de respuesta
function prepareResponse(receivedCode, receivedMessage, receivedItems = {}){
    const response = {
        responseCode: receivedCode,
        message: receivedMessage,
        data: receivedItems
    }
    return response;
}


//                      Usuarios (o simulación de usuarios)

//Verificar si el usuario existe con el nombre de usuario
router.get('/api/users/:username', (req, res) => {
    const {username} = req.params;
    const queryUser = `SELECT iduser FROM users WHERE username = '${username}'`;
    conexion.query(queryUser, (error, result) => {
        
        if (error) throw error;

        //Devolver datos
        if (result.length > 0){
            res.json(prepareResponse(1,'Usuario encontrado',result));
        }
        else{
            res.json(prepareResponse(0,'Usuario no encontrado'));
        }

    })
});


//                           Listas

//Devolver las listas de un usuario en específico
router.get('/api/:userid/listas', (req, res) => {
    const {userid} = req.params;
    const queryListas = `SELECT idlista, nombrelista FROM listas WHERE iduser = ${userid}`;
    conexion.query(queryListas, (error, result) => {
        if (error) throw error;
            
        if (result.length > 0){
            res.json(prepareResponse(1,'Listas encontradas',result));
        }
        else{
            res.json(prepareResponse(0, 'El usuario no tiene listas registradas'));
        }
    });
});


//Crear una nueva lista
router.post('/api/listas/nueva/', (req, res) => {
    const queryLista = "INSERT INTO listas SET ?";
    const listaObject = {
        nombrelista: req.body.nombrelista,
        iduser: req.body.iduser
    };
    conexion.query(queryLista, listaObject, error => {
        if (error) throw error;

        res.json(prepareResponse(1,'Lista creada exitosamente'));
    });
});

//Eliminar una lista
router.delete('/api/listas/borrar/:idlista', (req, res) => {
    const {idlista} = req.params;

    //No verificaré antes de eliminar
    const queryDelete = `DELETE FROM listas WHERE idlista = ${idlista}`;
    conexion.query(queryDelete, error =>{
            if (error) throw error;
            res.json(prepareResponse(1,'Lista eliminada exitosamente'));
    });
});

//Nota: No se podrán editar las listas



//               Items

//Crear un nuevo item de una lista
router.post('/api/listas/items/nuevo', (req, res)=>{
    queryItem = "INSERT INTO items_lista SET ?";
    const itemObject = {
        item: req.body.item,
        completado: 0,
        idlista: req.body.idlista
    };
    conexion.query(queryItem, itemObject, error => {
        if (error) throw error;

        res.json(prepareResponse(1,'Item añadido exitosamente'));
    });
});


//Marcar item como completado
router.put('/api/items/:iditem/cambiarestado', (req, res) => {
    const {iditem} = req.params;
    const queryCompletado = `UPDATE items_lista SET completado = NOT completado WHERE idelemento=${iditem}`; //Cambia el estado de completado
    conexion.query(queryCompletado, error => {
        if (error) throw error;
        res.json(prepareResponse(1,'Item cambiado de estado exitosamente'));
    });
});

module.exports = router;
