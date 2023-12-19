const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');
const { PORT } = require('./config');

app.use(cors());
app.use(morgan('tiny'));
app.use(history());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

//Esto debe ir después de todo el middleware.
app.use('/meseros', require('./routes/mesero')); //Módulo meseros en carpeta routes
app.use('/mesas', require('./routes/mesa')); //Módulo mesas en carpeta routes
app.use('/comidas', require('./routes/comida')); //Módulo comidas en carpeta routes
app.use('/bebidas', require('./routes/bebida')); //Módulo bebidas en carpeta routes
app.use('/ordenes', require('./routes/orden')); //Módulo ordenes en carpeta routes
app.use('/consultas', require('./routes/consulta')); //Módulo consultas en carpeta routes

// API REST -> HTTP -> Web
// GET, POST -> Enviar y modificar datos
// GET -> No modifica el estado de la base de datos
// POST -> Sí modifica el estado de la base de datos
//  HEAD
// POST -> Sí el estado de la base de datos
// PUT 

//Nuestra primera petición.
//app.get('/', function (req, res){
//    res.send('Hola mundo!');
//});

//Nuestra segunda petición.
//app.get('/hola', function (req, res){
//     res.send('Hola grupo de SAD!');
//});

//Nuestra tercer petición.
//app.get('/hola2', function (req, res){
//    res.send('Hola komo estás!');
//});

// Decirle a nuestra API en qué puerto correr(escuchar)
app.listen(PORT, function(){
    console.log('API corriendo en el puerto ', PORT);    
});