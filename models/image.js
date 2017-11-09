// Cargando Dependencias
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path');
// Creando el Esquema de imagenes
var ImageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  filename: { type: String },
  views: { type: Number, 'default': 0 },
  likes: { type: Number, 'default': 0 },
  timestamp: { type: Date, 'default': Date.now() }
});
// Creando una propiedad virtual
ImageSchema.virtual('uniqueId')
  .get(function () {
    return this.filename.replace(
      path.extname(this.filename), '');
  });
// Exportando es esquema
module.exports = mongoose.model('Image', ImageSchema);
