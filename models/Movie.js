const mongoose = require('mongoose');
// Creamos el esquema de la colección de Películas //
const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        director: { type: String, required: true },
        year: { type: Number, },
        genre: { type: String, required: true },
        picture: String 
      },
      {
        timestamps: true,
      }
);
// Creamos el modelo de la colección de Películas //
const Movie = mongoose.model('Movie', movieSchema);
    // Exportamos el modelo de la colección de Películas //
module.exports = Movie;
