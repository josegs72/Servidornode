const express = require('express');
const {connect} = require('./utils/db')

//connect();

const PORT = 3000;
const server = express();

const Movie = require('./models/Movie');

const router = express.Router();

router.get('/movies', async (req, res) => {
	try {
		const movies = await Movie.find();
		return res.status(200).json(movies)
	} catch (err) {
		return res.status(500).json(err);
	}
});

server.use('/', router);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});