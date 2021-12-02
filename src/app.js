//Inicializar dependencias requeridas
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Configurar puerto a utilizar por la aplicación
const PORT = process.env.PORT || 3000;

//Definir instancia de express
const app = express();

//Definir uso de bodyparser
app.use(bodyParser.json());

//Configurar ejs como motor de plantillas
app.set('view engine', 'ejs');

//Definir el directorio donde estarán las vistas
app.set('views', path.join(__dirname, 'views'));

//Configurar la extensión de archivos de modo que sea .html para evitar confusiones
app.engine('html', require('ejs').renderFile);

//Importar rutas
app.use(require('./routes/index'));


//Inicializar aplicación
app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));