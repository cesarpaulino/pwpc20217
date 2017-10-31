var StatsHelper = require('./statshelper'),
    ImagesHelper = require('./imageshelper'),
    CommentsHelper = require('./commentshelper');

    module.exports=function(vm,cb){
        vm.sidebar={
            stats:StatsHelper(),
            popular:ImagesHelper.popular(),
            comments:CommentsHelper.newest()
        };
        //mandamos a ejecutar el cb
        //pasando como parametro el vm
        //con los datos del siderbar llenos
        cb(vm);
    };