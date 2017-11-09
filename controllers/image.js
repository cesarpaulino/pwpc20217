// Dependencias
var fs = require('fs'),
    path = require('path'),
    sidebar = require('../helpers/sidebar'),
    Models = require('../models'),
    md5 = require('md5');
// Importando el Helper sidebar se repite una vez mas
var sidebar = require("../helpers/sidebar");

module.exports = {
    // Action Methods
    index: (req, res) => {
        // Agregando el ViewModel
        var viewModel = {
            image: {},
            comments: []
        };
        // Realizando la consulta
        Models.Image.findOne({
            filename: {
                $regex: req.params.image_id
            }
        }, function (err, image) {
            if (err) {
                console.log("> Error en la consulta en image/index");
                throw err;
            }
            if (image) {
                // Incrementando el conteno de vistas en 1
                image.views = image.views + 1;
                // Cargando la imagen al viewModel
                viewModel.image = image;
                // Salvando el modelo
                image.save();
                // Cargando los comentarios
                Models.Comment.find({
                    image_id: image._id
                }, {}, {
                        sort: { 'timestamp': 1 }
                    }, function (err, comments) {
                        if (err) {
                            console.log("> Error al consultar los comentarios image/index");
                            throw err;
                        }
                        viewModel.comments = comments;
                        // Ejecutando Helper Sidebar
                        sidebar(viewModel, (viewModel) => {
                            res.render('image', viewModel);
                        });
                    });
            } else {
                console.log('> No se encontro Imange');
                console.log('> Redireccionando a Home');
                res.redirect('/');
            }
        });
    },
    create: (req, res) => {
        // Buscar 
        // Se implementa un CB
        var saveImage = () => {
            // Generando una lista de
            // caracteres validos
            var dictionary = "abcdefghijklmnopqertuvwxyz123456789";
            var imgUrl = "";
            // Creando un nombre de 6 caracteres
            // tomados al azar
            for (var i = 0; i < 6; i++) {
                imgUrl += dictionary.charAt(
                    Math.floor(Math.random() * dictionary.length));
            }
            // Realizando consulta para ver previa existencia
            // de imgUrl en la base de datos
            Models.Image.find({
                filename: imgUrl
            }, function (err, images) {
                if (images.length > 0) {
                    // Se llama recursivamente
                    saveImage();
                } else {
                    // Cargando el archivo a los estaticos
                    var temPath = req.files[0].path;
                    // Extrayendo la extension del archivo cargado
                    var ext =
                        path.extname(
                            req.files[0].originalname).toLowerCase();
                    // Generando la ruta final de carga
                    var targetPath =
                        path.resolve('./public/upload/' + imgUrl + ext);
                    console.log(`> Path de archivo cargado: ${targetPath}`);
                    // Almacenando el archivo si este cumple con una
                    // politica de extensiones permitidas
                    if (ext === '.png' ||
                        ext === '.jpg' ||
                        ext === '.jpeg' ||
                        ext === '.gif') {
                        // Cambiando la ruta del archivo
                        fs.rename(temPath, targetPath, (err) => {
                            if (err) throw err;
                            // Se Crea un modelo de la imagen Cargada
                            var newImg = new Models.Image({
                                title: req.body.title,
                                filename: imgUrl + ext,
                                description: req.body.description
                            });
                            // Y se salva la imagen en la BD
                            newImg.save(function (err, image) {
                                if (err) {
                                    console.log("> Error al salvar img en bd");
                                    throw err;
                                }
                                // Se redirecciona a la pagina del sitio
                                res.redirect('/images/index/' + image.uniqueId);
                            });
                        });
                    } else {
                        fs.unlink(temPath, (err) => {
                            if (err) {
                                console.log(`> Error al borrar: ${temPath}`)
                                throw err;
                            };
                            console.log(`> Se borra archivo: ${temPath}`);
                            res.status(500).json(
                                {
                                    error: 'Solo archivos de imagenes permitidos'
                                }
                            );
                        });
                    }
                }
            });
        };
        saveImage();
    },
    like: (req, res) => {
        // Se realiza al consulta de
        // la imagen a la cula se le quiere
        // incrementar su contador like
        Models.Image.findOne({
            filename: { $regex: req.params.image_id }
        }, function (err, img) {
            if (err || img == null) {
                console.log(`> Error al buscar imagen: ${req.params.image_id}`);
                throw err;
            }
            img.likes = img.likes + 1;
            img.save(function (err) {
                if (err) {
                    console.log("> Error al salvar like");
                    res.json(err);
                } else {
                    res.json({
                        likes: img.likes
                    });
                }
            });
        });
    },
    comment: (req, res) => {
        Models.Image.findOne({
            filename: {
                $regex: req.params.image_id
            }
        }, (err, image) => {
            if (!err && image) {
                var newComment = new Models.Comment(
                    req.body
                );
                // Hasheando el correo
                // Instalar dependencia md5
                newComment.gravatar = md5(newComment.email);
                newComment.image_id = image._id;
                // Se Salvan las modificaciones
                newComment.save((err, comment) => {
                    if (err) {
                        console.log(`> Error al salvar comentario`);
                        throw err;
                    }
                    // Se recarga la pagina con el comentario
                    // Se situa la vista con un hash en el comentario
                    // recien creado (Fragments)
                    res.redirect(
                        '/images/index/' + image.uniqueId + '#' + comment._id);
                });
            } else {
                // No se encontro la imagen que
                // se quiere comentar
                res.redirect('./');
            }
        });
    }
};