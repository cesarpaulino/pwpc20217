// Cargando Dependencias
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  // Tipo especial
  ObjectId = Schema.ObjectId;
// Creando el Esquema de Comments
var CommentSchema = new Schema({
  image_id: { type: ObjectId },
  email: { type: String },
  name: { type: String },
  gravatar: { type: String },
  comment: { type: String },
  timestamp: { type: Date, 'default': Date.now() }
});
// Creando una propiedad virtual
CommentSchema.virtual('image')
  .set(function (image) {
    this._image = image;
  }).get(function () {
    return this._image;
  });
// Exportando es esquema
module.exports = mongoose.model('Comment', CommentSchema);
