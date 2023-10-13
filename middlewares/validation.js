const { Joi } = require('celebrate');
const { link } = require('../utils/regularExpressions');

const newMovie = Joi.object().keys({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required().regex(link),
  trailerLink: Joi.string().required().regex(link),
  thumbnail: Joi.string().required().regex(link),
  movieId: Joi.number().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
});

const deleteMovie = Joi.object().keys({
  movieId: Joi.number().required(),
});

const patchUser = Joi.object().keys({
  email: Joi.string().required().email(),
  name: Joi.string().required().min(2).max(30),
});

const signup = Joi.object().keys({
  email: Joi.string().required().max(320).email(),
  name: Joi.string().required().min(2).max(30),
  password: Joi.string().required(),
});

const signin = Joi.object().keys({
  email: Joi.string().required().max(320).email(),
  password: Joi.string().required().min(8).max(20),
});

module.exports = {
  newMovie, deleteMovie, patchUser, signup, signin,
};
