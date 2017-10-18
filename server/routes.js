var express = require('express'),
    router = express.Router();

    //Cargar los Controladores
var homeController = require('../controllers/home'),
    imageController = require('../controllers/image');

module.exports = function(app){
    //TODO:agregar rutas a la aplicacion
    //contenedor de rutas
    //router--> verbo---> que ejecutar
    //:image --> es un parametro que funciona para elegir el acction method 
    router.get('/', homeController.index);
    //shift + alt mas hacia abajo
    router.get('/index', homeController.index);
    router.get('/images/index/:image_id',imageController.index);
    router.post('/images/create', imageController.create);
    router.post('/images/like/:image_id',imageController.like);
    router.post('/images/comment/:image_id',imageController.comment);
    //Agregar el contenedor de rutas a nuestras aplicacion
    app.use(router);
    return app;
}   