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
router.post('/api/items/nuevo', (req, res)=>{
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


//Eliminar items marcados como completados
router.delete('/api/:idlista/items/borrar/completados', (req, res) => {
    const {idlista} = req.params;
    const queryDelete = `DELETE FROM items_lista WHERE completado = 1 AND idlista = ${idlista}`;
    conexion.query(queryDelete, error =>{
        if (error) throw error;
        res.json(prepareResponse(1,'Los elementos completados de la lista han sido eliminados'));
    });
});


//Eliminar todos los items de una lista
router.delete('/api/:idlista/items/borrar/todos', (req, res) => {
    const {idlista} = req.params;
    const queryDelete = `DELETE FROM items_lista WHERE idlista = ${idlista}`;
    conexion.query(queryDelete, error =>{
        if (error) throw error;
        res.json(prepareResponse(1,'Todos los elementos de la lista han sido eliminados'));
    });
});

//Listar todos los items de la lista
router.get('/api/listas/:idlista/items', (req, res) => {
    const {idlista} = req.params;
    const query = `SELECT idelemento, item, completado FROM items_lista WHERE idlista = ${idlista}`;
    conexion.query(query, (error, result) =>{
        if (error) throw error;

        if (result.length > 0){
            res.json(prepareResponse(1,'Items encontrados',result));
        }
        else{
            res.json(prepareResponse(0, 'La lista está vacía'));
        }
    });
});


//                      Rutas para el frontend

//Página principal: simulará una simple gestión de usuarios
router.get('/', (req, res) => {
    res.render('index.html');
});

//Página para ver las listas
router.get('/:iduser/mislistas', (req, res) => {
    const {iduser} = req.params;
    res.render('listas.html', {iduser: iduser});
});

//Página para ver los items de un
router.get('/lista/:idlista', (req, res) => {
    const {idlista} = req.params;
    res.render('verLista.html', {idlista: idlista});
})




module.exports = router;