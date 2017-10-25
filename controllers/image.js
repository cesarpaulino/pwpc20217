var md5 = require('md5');
module.exports = {
    //Action Methods
    index: (req, res)=>{
        //res.end(`Se accede al controlador image y se ejecuta el action method 
        //"index" con el siguienteparametro -->${req.params.image_id}`);
        var viewModel = {
            image: {
                    uniqueId: 1,
                    title: "Sample Image 1",
                    description: "Awesome Description",
                    filename: "1.png",
                    views : Math.floor(Math.random()*100),
                    likes : Math.floor(Math.random()*50),
                    timestamp: Date.now()
            },
            comments: [
                {
                    image_id: 1,
                    email: 'cesar_paulino@icloud.com',
                    name: "Cesar Paulino",
                    gravatar: md5("cesar_paulino@icloud.com"),
                    //md5(cesar_paulino@icloud.com)
                    comment: "Asi me pondre cuando pase PCII",
                    timestamp: Date.now()
                },
                {
                    image_id: 1,
                    email: 'cesar_paulino@icloud.com',
                    name: "Cesar Paulino",
                    gravatar: "eef5ce9485974e743540b05224686ba5",
                    comment: "Asi me pondre cuando nos acepten el Proyecto de Mundo",
                    timestamp: Date.now()
                },
                {
                    image_id: 1,
                    email: 'cesar_paulino@icloud.com',
                    name: "Cesar Paulino",
                    gravatar: md5("cesar_paulino@icloud.com"),
                    //md5(cesar_paulino@icloud.com)
                    comment: "Asi me pondre cuando sea Papa",
                    timestamp: Date.now()
                }
            ]
        };
        res.render('image', viewModel);
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