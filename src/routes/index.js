const express = require('express');

const router = express.Router();

const hello = require('./api/hello.routes');
const user = require('./api/user.routes');
const hydrant = require('./api/hydrant.routes');

router.use('/hello', hello);
router.use('/user', user);
router.use('/hydrant', hydrant);

module.exports = router;
