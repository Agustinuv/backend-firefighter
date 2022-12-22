const express = require('express');

const router = express.Router();

const hello = require('./api/hello.routes');

router.use('/hello', hello);

module.exports = router;
