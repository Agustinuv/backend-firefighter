const express = require('express');

const router = express.Router();

const { singUp, listAll, login } = require('../../controllers/user.controller');
const authorization = require('../../middlewares/auth');

// List all users
router.get('/listAll', authorization, (req, res) => {
    listAll(req, res);
});

router.post('/singUp', (req, res) => {
    singUp(req, res);
});

router.post('/login', (req, res) => {
    console.log('login');
    login(req, res);
});

module.exports = router;
