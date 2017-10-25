//Un controlador viene haciendo 
//las veces de un objeto
module.exports = {
    //Action Methods
    index:(req, res)=>{
      //res.send('--> Se ejecuta el Metodo Index del Controlador Home');
      //Al grupo de datos que requiere na vista para dibujarse correctamente se
      //le llama en el modelo MVC
      //Creando un ViewModel de Prueba
      var ViewModel = {
          images : [ 
              {
                uniqueId: 1,
                title: "Sample Image 1",
                description: "Awesome Description",
                filename: "1.png",
                views : Math.floor(Math.random()*100),
                likes : Math.floor(Math.random()*50),
                timestamp: Date.now()
              },
              {
                uniqueId: 2,
                title: "Sample Image 1",
                description: "Awesome Description",
                filename: "1.png",
                views : Math.floor(Math.random()*100),
                likes : Math.floor(Math.random()*50),
                timestamp: Date.now()
              },
              {
                uniqueId: 3,
                title: "Sample Image 1",
                description: "Awesome Description",
                filename: "1.png",
                views : Math.floor(Math.random()*100),
                likes : Math.floor(Math.random()*50),
                timestamp: Date.now()
              },
              {
                uniqueId: 4,
                title: "Sample Image 1",
                description: "Awesome Description",
                filename: "1.png",
                views : Math.floor(Math.random()*100),
                likes : Math.floor(Math.random()*50),
                timestamp: Date.now()
              },
              {
                uniqueId: 5,
                title: "Sample Image 1",
                description: "Awesome Description",
                filename: "1.png",
                views : Math.floor(Math.random()*100),
                likes : Math.floor(Math.random()*50),
                timestamp: Date.now()
              },
        ]
      };
      res.render('index', ViewModel);
    }
  };