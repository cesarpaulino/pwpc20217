// Cargando depenencias
var models = require('../models'),
    async = require('async');

module.exports = {
    newest: function (callback) {
        models.Comment.find({}, {}, {
            limit: 5,
            sort: { 'timestamp': -1 }
        }, (err, comments) => {
            // Funcion adjuntar imagen
            var attachImage = (comment, next) => {
                models.Image.findOne({
                    _id: comment.image_id
                }, (err, image) => {
                    if (err) throw err;
                    comment.image = image;
                    next(err)
                });
            };
            // Se aplica la funcion
            // a cada una de 5 imagenes
            // encontradas
            async.each(comments, attachImage, (err) => {
                if (err) throw err;
                callback(err, comments);
            });
        });
    }
};