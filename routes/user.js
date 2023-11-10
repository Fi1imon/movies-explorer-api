const router = require('express').Router();
const { celebrate } = require('celebrate');
const { patchUser } = require('../middlewares/validation');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', celebrate({ body: patchUser }), updateUser);

module.exports = router;
