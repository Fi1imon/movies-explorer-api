const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email является обязательным'],
    unique: [true, 'На один email можно зарегистрировать только одного пользователя'],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: (props) => `"${props.value}" - некорректный email`,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password является обязательным'],
    select: false,
    // minlength: [8, 'Минимальная длина поля password 2 символа'],
    // maxlength: [20, 'Максимальная длина поля password 20 символов'],
  },
  name: {
    type: String,
    required: [true, 'Поле name является обязательным'],
    minlength: [2, 'Минимальная длина поля name 2 символа'],
    maxlength: [30, 'Максимальная длина поля name 30 символов'],
  },
});

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized({ message: 'Неправильные мейл или пароль.' }));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized({ message: 'Неправильные мейл или пароль.' }));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
