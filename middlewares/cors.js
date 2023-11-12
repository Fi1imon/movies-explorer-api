const allowedCors = [
  'https://movies.fi1imon.nomoredomainsmonster.ru/',
  'https://movies.fi1imon.nomoredomainsmonster.ru',
  'http://localhost:3000/',
  'http://localhost:3000',
];

const checkCors = (req, res, next) => {
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', origin);

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);

      res.end();
      return;
    }
  }

  next();
};

module.exports = { checkCors };
