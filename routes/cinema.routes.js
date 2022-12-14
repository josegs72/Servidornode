const express = require('express');
const cinemasRouter = express.Router();
const createError = require('../utils/errors/create-error.js');
const Cinema = require('../models/Cinema.js');

// Rutas de  /api/cinemas //


cinemasRouter.get('/', async (req, res, next) => {
	try {
		const cinemas = await Cinema.find().populate('movies');
		return res.status(200).json(cinemas)
	} catch (err) {
		return next(err)
	}
});

// Ruta de crear /api/cinemas//



cinemasRouter.post('/create', async (req, res, next) => {
    try{
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies: []
        });
        if (!newCinema) {       
            return next(createError('No se ha podido crear el cine', 404));
        }


        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    }catch(err){
        return next(err)
    }
});

// Ruta de eliminar /api/cinemas/:id //

cinemasRouter.delete('/:id', async (req, res, next) => {
    try{
        const{id} = req.params;
        if(!id){
            return next(createError('No se ha podido eliminar el cine', 404));
        }
        const cinemaDeleted = await Cinema.findByIdAndDelete(id);
        return res.status(200).json(cinemaDeleted);
    }catch(err){
        return next(err)
    }
});

// Ruta de añadir película /api/cinemas/add-movie //

cinemasRouter.put('/add-movie', async (req, res, next) => {
    try {
        const { cinemaId } = req.body;
        const { movieId } = req.body;
        if (!cinemaId || !movieId) {
            return next(createError('No se ha podido añadir la película', 404));
        }
        const cinema = await Cinema
        
        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $push: { movies: movieId } },
            { new: true }
        );
        return res.status(200).json(updatedCinema);
    } catch (err) {

        return next(err);
    }
});

//modulo exportado//
module.exports = cinemasRouter;