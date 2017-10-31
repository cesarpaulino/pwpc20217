//Un controlador viene haciendo 
//las veces de un objeto
// Imporntado codigos
// del Sidebar
var sidebar = require('../helpers/sidebar');

module.exports = {
    //Action Methods
    index:(req, res)=>{
      //res.send('--> Se ejecuta el Metodo Index del Controlador Home');
      //Al grupo de datos que requiere na vista para dibujarse correctamente se
      //le llama en el modelo MVC
      //Creando un ViewModel de Prueba
      var viewModel = {
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
        ]
      };
    
      //invocando al helper de siderbar
      //y posteriormente  
      //mandando a renderizar la vista
      sidebar(viewModel,(vm)=>{
        res.render("index", vm);
      })
    }
  };