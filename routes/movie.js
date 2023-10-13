const { celebrate } = require('celebrate');
const router = require('express').Router();
const { newMovie, deleteMovie } = require('../middlewares/validation');
const { getMovies, createMovie, removeMovie } = require('../controllers/movies');

router.get('', getMovies);

router.post('', celebrate({ body: newMovie }), createMovie);

router.delete('/:movieId', celebrate({ params: deleteMovie }), removeMovie);

module.exports = router;
