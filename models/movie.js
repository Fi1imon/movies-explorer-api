const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле country является обязательным'],
  },
  director: {
    type: String,
    required: [true, 'Поле director является обязательным'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration является обязательным'],
  },
  year: {
    type: String,
    required: [true, 'Поле year является обязательным'],
  },
  description: {
    type: String,
    required: [true, 'Поле description является обязательным'],
  },
  image: {
    type: String,
    required: [true, 'Поле image является обязательным'],
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: (props) => `"${props.value}" - не является URL адресом`,
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле trailerLink является обязательным'],
    validate: {
      validator(trailerLink) {
        return validator.isURL(trailerLink);
      },
      message: (props) => `"${props.value}" - не является URL адресом`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail является обязательным'],
    validate: {
      validator(thumbnail) {
        return validator.isURL(thumbnail);
      },
      message: (props) => `"${props.value}" - не является URL адресом`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле owner является обязательным'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле movieId является обязательным'],
    unique: false,
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRU является обязательным'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN является обязательным'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
