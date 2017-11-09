var models = require('../models'),
    async = require('async');
module.exports = function (callback) {
    async.parallel([
        (next) => {
            // Contando de imagenes
            models.Image.count({}, next);
        },
        (next) => {
            // Contando Comentarios
            models.Comment.count({}, next);
        },
        (next) => {
            // Contando Views
            models.Image.aggregate({
                $group: {
                    _id: '1',
                    viewsTotal: {
                        $sum: '$views'
                    }
                }
            }, (err, result) => {
                var viewsTotal = 0;
                if (result.length > 0) {
                    viewsTotal += result[0].viewsTotal;
                }
                next(null, viewsTotal);
            });
        },
        (next) => {
            // Contando Likes
            models.Image.aggregate({
                $group: {
                    _id: '1',
                    likesTotal: {
                        $sum: '$likes'
                    }
                }
            }, (err, result) => {
                var likesTotal = 0;
                if (result.length > 0) {
                    likesTotal += result[0].likesTotal;
                }
                next(null, likesTotal);
            });
        }
    ], (err, results) => {
        callback(null, {
            images: results[0],
            comments: results[1],
            views: results[2],
            likes: results[3]
        });
    })
};