//Cragando Dependencias
var md5 = require('md5'),
    fs = require('fs'),
    path = require('path'),
    siderbar= require('../helpers/sidebar'),
    likeCount = 12;

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
                    comment: "Asi me pondre cuando sea Papa",
                    timestamp: Date.now()
                }
            ]
        };
       // res.render('image', viewModel);
       //invocamos al helper de sidebar
       //y posteriormente
       //mandamos a renderizar la vista
       siderbar(viewModel,(vm)=>{
           res.render("image",vm);
       });
    },
    create: (req, res)=>{
        //Creando la funcion que salva la imagen en disco 
        var saveImage = ()=>{
            //Crear un dictionario de caracteres validos
            var dictionary ="qwertyuiopasdfghjklñzxcvbnm1234567890";
            //Ruta final de la imagen cargada
            var imgUrl = "";
            //armando el nombre tomando 6 caracteres de mi diccionario
            for (var index = 0; index < 6; index++) {
                imgUrl += dictionary.charAt(
                    Math.floor(Math.random() * dictionary.length)
                );
            }
            //Obteniendo la ruta del archivo cargado por el usuario
            var temPath = 
                req.files[0].path;
            //Averiguar la extencion del archivo cargado
            var ext = 
                path.extname(req.files[0].originalname).toLowerCase();
            //Crear la ruta del destino final de la imagen cargada 
            var targetPath = 
                path.resolve('./public/upload/' + imgUrl + ext);
            //Agregar un filtro de extenciones 
            if(ext ==".png" || 
            ext == ".jpg" || 
            ext == ".gif" || 
            ext ==".jpeg"){
                //La imagen tiene extencion valida guardarla en la ruta final 
                fs.rename(temPath, targetPath, (err)=>{
                    //hubo error al cargar
                    if(err){
                        console.log("> Error al Guardar imagen....");
                        throw err;
                    }
                    //No hubo error al cargar
                    res.redirect(`/images/index/${imgUrl}`);
                });
            }else{
                //Se detecta un archivo invalido
                fs.unlink(temPath,()=>{
                    if(err){
                    console.log("> Error al borrar archivo invalido....");
                    throw err;
                }
                //Si se borro el archivo invalido
                res.status(500).json({
                    error: "Solo se permite cargar archivo validos."
                });
            });
        }
    }
    //Ejecutando la funcion de salvar la imagen
    saveImage();
},

    like: (req, res)=>{
        res.json({
            //preincremento ++ al like
            likes: ++likeCount
        });
    },
    comment: (req, res)=>{
        res.end(`Se accede al controlador Image y se ejecuta el accion method 
        "comment" con el siguiente parametro -->${req.params.image_id}`);
    }

};