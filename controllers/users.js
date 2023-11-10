const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { NotFoundError } = require('../errors/NotFoundError');
const { Unauthorized } = require('../errors/Unauthorized');
const { Conflict } = require('../errors/Conflict');

const { JWT_SECRET = 'super-secret-key' } = process.env;

const User = require('../models/user');

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError({ message: 'Пользователь не найден.' });
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict({ message: 'Пользователь с таким email уже существует.' }));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      res.status(201).send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict({ message: 'Пользователь с таким email уже существует.' }));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials({ email, password })
    .then((user) => {
      if (!user) {
        throw new Unauthorized({ message: 'Проверьте корректность отправленных данных.' });
      }

      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: 'Успешно' })
        .end();
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt', {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
  });

  res
    .status(200)
    .send({ message: 'Успешно' })
    .end();
};
