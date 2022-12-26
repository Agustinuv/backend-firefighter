const express = require('express');

const router = express.Router();

const hello = require('./api/hello.routes');
const user = require('./api/user.routes');

router.use('/hello', hello);
router.use('/user', user);

module.exports = router;
