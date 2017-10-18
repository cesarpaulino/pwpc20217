//Un controlador viene haciendo 
//las veces de un objeto
module.exports = {
    //Action Methods
    index:(req, res)=>{
      //res.send('--> Se ejecuta el Metodo Index del Controlador Home');
      res.render('index');
      
    }
  };