require('dotenv').config();

const { PORT = 3000, DB_CONN = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const { celebrate, errors } = require('celebrate');

const { createUser, login, logout } = require('./controllers/users');

const { auth } = require('./middlewares/auth');

const { signup, signin } = require('./middlewares/validation');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { rateLimiter } = require('./middlewares/rateLimiter');

const { errorHandler } = require('./middlewares/errorHandler');

const { NotFoundError } = require('./errors/NotFoundError');

const app = express();

mongoose.connect(DB_CONN);

app.listen(PORT, () => {});

app.use(bodyParser.json());

app.use(cookieParser());

app.use(helmet());

app.use(requestLogger);

app.use(rateLimiter);

app.post('/signup', celebrate({ body: signup }), createUser);
app.post('/signin', celebrate({ body: signin }), login);

app.use(auth);

app.post('/signout', logout);
app.use('/users', require('./routes/user'));
app.use('/movies', require('./routes/movie'));

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError({ message: 'Страница не найдена.' }));
});

app.use(errorHandler);
