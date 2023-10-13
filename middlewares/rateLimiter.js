const rateLimit = require('express-rate-limit');

module.exports.rateLimiter = (req, res, next) => {
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });

  next();
};
