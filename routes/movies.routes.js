const express = require('express');
const Movie = require('../models/Movie.js');


const router = express.Router();

router.get('/' , async (req ,res) => {
  try{
   const movies = await Movie.find();
   return res.status(200).json(movies);
  }catch (err){
   return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const movies = await Movie.findById(id);
		if (movies) {
			return res.status(200).json(movies);
		} else {
			return res.status(404).json('No hay pelicula con este id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});




module.exports = router