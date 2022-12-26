const express = require('express');

const router = express.Router();

const { singUp, listAll } = require('../../controllers/user.controller');

router.get('/listAll', (req, res) => {
    listAll(req, res);
});

router.post('/singUp', (req, res) => {
    singUp(req, res);
});

module.exports = router;
