//Cargando Dependencias importantes de la aplicacion

var path = require('path'),
    exphdb = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan')
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment')
    multer = require('multer');

    //verbos de aplicacion method
//Cargando las rutas de la aplicacion
var routes = require('./routes');


module.exports = function(app){
    //Agregando los middlewares a la aplicaciones
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended': true}));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('algun-valor-secreto-aquí'));

    //Asignar las rutas a la aplicacion
    app = routes(app);

    //Configurar las rutas de archivos estaticos
    app.use('/public/',
    express.static(path.join(__dirname, '../public')));

    //SI LA APLICACION ESTA EN MODO DE DESARROLLO SE USARA ERRORHANDLER
    if(app.get('evn') == 'development'){
        app.use(errorHandler());
    }

    return app;
}