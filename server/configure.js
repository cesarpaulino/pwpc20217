//exportar funcionalidad
//cargando dependencias importantes de la app
var path = require('path'),
    exphdb = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    multer = require('multer');
//verbos de aplicacion method Cargando las rutas de la aplicacion
var routes = require('./routes');

module.exports = function (app) {
    //Configurando el Motor de Plantillas Hanlebars Template Engine
    //1. Cargar y configurar el motor de platilla en la aplicacion express
    //esta linea ayuda a decidir si usare CDN para cargar las dependecias front-end
    var mainLayout = app.get('depmode') === 'local' ? "main-local" : "main"
    //console.log(`> Estrategia: ${app.get('depmode')}`);
    //console.log(`> Tipo Layout: ${mainLayout}`);
    app.engine('.hbs', exphdb.create({
        defaultLayout: mainLayout, //Platilla por defecto
        extname: '.hbs', // Extencion de las vistas
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: [path.join(app.get('views'), 'partials')],
        // Adding a Helper
        helpers: {
            timeago: function (timestamp) {
                return moment(timestamp).
                startOf('minutes').fromNow();
                //momnet 
            }
        }
    }).engine);
    //2. Establecer a handlebars como el motor de la plantilla de trabajo
    app.set('view engine', '.hbs');
    //pendiente agregar el codigo que configura a app
    //Agregando los middlewares a la aplicaciones
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ 'extended': true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('algun-valor-secreto-aquí'));

    //Habilitando a la aplicacion para recin¡vir archivos desde formularios
    //mediante la encriptacion multipar/form-date
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')
    }).any());

    //Asignar las rutas a la aplicacion
    app = routes(app);

    //Configurar las rutas de archivos estaticos
    app.use('/public/', express.static(path.join(__dirname, '../public')));

    //SI LA APLICACION ESTA EN MODO DE DESARROLLO SE USARA ERRORHANDLER
    if ('development' === app.get('evn')) {
        app.use(errorHandler());
    }
    return app;
}