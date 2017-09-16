//Cargando Express
const express = require('express');
//Cargando path
const path = require('path');
//Cargando un Configurador
const config = require('./server/configure');

//Una instancia de la aplicacion con express
var app = express();

//Estableciones una variables de entorno 
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || "0.0.0.0");

//Configuraciones especiales
app.set('views', path.join(__dirname,'views'));

//Aplicando configuraciones generales 
app = config(app);

//creando una ruta de prueba 
app.get('/', (req, res)=>{
    res.send('Hola Pila Completa 2, Viva Javascript');
});

//Consultando las variables de entorno
//de la aplicacion
const IP = app.get('ip');
const PORT = app.get('port');

//Iniciando el Servidor
app.listen(PORT, IP, (err)=>{
    if(err){
    console.log(`> error en el servidro.js ln32: ${err}`);
}
    console.log(`> Server listening @ http://${IP}:${PORT}`);
});
