//Un controlador viene haciendo 
//las veces de un objeto
// Imporntado codigos
// del Sidebar
var sidebar = require('../helpers/sidebar');
// Cargando modelos
var ImageModel = require('../models').Image;
module.exports = {
  // Action Method
  index: (req, res) => {
    // Creando el Viewmodel
    var viewModel = {
      images: []
    };
    //Realizando la consulta
    // find({consulta},{proyeccion},{opciones},cb)
    ImageModel.find({}, {}, {
      sort: { timestamp: -1 }
    }, function (err, images) {
      if (err) {
        console.log("> Error en consulta home/index");
        throw err;
      }
      viewModel.images = images;
      // Resolviendo los datos
      // de la Sidebar
      sidebar(viewModel, (viewModel) => {
        res.render("index", viewModel);
      });
    });
  }
};