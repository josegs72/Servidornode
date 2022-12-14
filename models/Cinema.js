const mongoose = require('mongoose');
// Creamos el esquema de la colección de Cines //

const cinemaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
  },
  {
    timestamps: true,
  }
);
// Creamos el modelo de la colección de Cines //
const Cinema = mongoose.model('Cinema', cinemaSchema);
// Exportamos el modelo de la colección de Cines //
module.exports = Cinema;