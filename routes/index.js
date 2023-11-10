const router = require('express').Router();
const { logout } = require('../controllers/users');

router.post('/signout', logout);

router.use('/users', require('./user'));

router.use('/movies', require('./movie'));

module.exports = router;
