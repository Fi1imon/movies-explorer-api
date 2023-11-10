const Movie = require('../models/movie');
const { BadRequest } = require('../errors/BadRequest');
const { NotFoundError } = require('../errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest({ message: `Переданы некорректные данные для создания фильма. err: ${err.message}` }));
        return;
      }
      next(err);
    });
};

module.exports.removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findOne({ movieId, owner: _id })
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError({ message: 'Фильм с указанным id не найден.' });
      }

      Movie.findOneAndDelete({ movieId, owner: _id })
        .then(() => res.send({ message: 'Фильм успешно удален' }))
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new NotFoundError({ message: 'Фильм с указанным id не найден' }));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};
