module.exports = {
    //Action Methods
    index: (req, res)=>{
        //res.end(`Se accede al controlador image y se ejecuta el action method 
        //"index" con el siguienteparametro -->${req.params.image_id}`);
        res.render('image');
    },
    create: (req, res)=>{
        res.end(`Se accede al controladro Image y se ejecuta el action method 
        "/create/""`);
    },
    like: (req, res)=>{
        res.end(`Se accede al controlador Image y se ejecuta
        el accion method "like" con el siguiente 
        parametro -->${req.params.image_id}`);
    },
    comment: (req, res)=>{
        res.end(`Se accede al controlador Image y se ejecuta el accion method 
        "comment" con el siguiente parametro -->${req.params.image_id}`);
    }
};