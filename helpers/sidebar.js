var StatsHelper = require('./statshelper'),
    ImagesHelper = require('./imageshelper'),
    CommentsHelper = require('./commentshelper'),
    // Cargandp async
    async = require('async');
// vm: viewmodel
// cb: Callback
module.exports = function (vm, cb) {
    async.parallel([
        (next) => {
            StatsHelper(next);
        },
        (next) => {
            ImagesHelper.popular(next);
        },
        (next) => {
            CommentsHelper.newest(next);
        },
    ], (err, results) => {
        vm.sidebar = {
            stats: results[0],
            popular: results[1],
            comments: results[2]
        };
        // Invocando al callback
        // pasandole el viewmodel
        cb(vm);
    });
};