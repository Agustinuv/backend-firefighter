const express = require('express');

const router = express.Router();

const { create,
    update,
    deleteById,
    listAllUbications,
    findById } = require('../../controllers/hydrant.controller');

router.post('/create', (req, res) => {
    create(req, res);
});

router.put('/update', (req, res) => {
    update(req, res);
});

router.delete('/delete/:id', (req, res) => {
    deleteById(req, res);
});

router.get('/listAllUbications', (req, res) => {
    listAllUbications(req, res);
});

router.get('/findById/:id', (req, res) => {
    findById(req, res);
});

module.exports = router;