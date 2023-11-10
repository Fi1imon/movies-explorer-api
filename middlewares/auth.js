const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/Unauthorized');

const { JWT_SECRET = 'super-secret-key' } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Unauthorized({ message: 'Необходима авторизация' }));
  }

  req.user = payload;
  next();
};
