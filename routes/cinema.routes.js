const express = require('express');
const router = express.Router();
const createError = require('../utils/errors/create-error.js');

const Cinema = require('../models/Cinema.js');

router.get('/', async (req, res, next) => {
	try {
		const cinemas = await Cinema.find().populate('movies');
		return res.status(200).json(cinemas)
	} catch (err) {
		return next(err)
	}
});

router.post('/create', async (req, res, next) => {
    try{
        const newCinema = new Cinema({
            name: req.body.name,
            location: req.body.location,
            movies: []
        });

        const createdCinema = await newCinema.save();
        return res.status(201).json(createdCinema);
    }catch(err){
        return next(err)
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        const{id} = req.params;
        const cinemaDeleted = await Cinema.findByIdAndDelete(id);
        return res.status(200).json(cinemaDeleted);
    }catch(err){
        return next(err)
    }
});

router.put('/add-movie', async (req, res, next) => {
    try {
        const { cinemaId } = req.body;
        const { movieId } = req.body;
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

module.exports = router;