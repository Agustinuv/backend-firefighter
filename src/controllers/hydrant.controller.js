'use strict';

const dotenv = require('dotenv');
const { User, Hydrant } = require('../models');
dotenv.config();

// Create and Save a new Hydrant
const create = async (req, res) => {
    // Validate request
    if (!req.body.latitude) {
        res.status(400).send({
            message: 'Latitude can not be empty!',
        });
        return;
    }
    if (!req.body.longitude) {
        res.status(400).send({
            message: 'Longitude can not be empty!',
        });
        return;
    }
    if (!req.body.data) {
        res.status(400).send({
            message: 'Data can not be empty!',
        });
        return;
    }

    // ###############################################################################
    // 
    // IN THE FUTURE, MANAGE WHEN ALREADY EXISTS A HYDRANT IN THE SAME LOCATION 
    // AND ASK THE USER IF HE WANTS TO UPDATE THE EXISTING HYDRANT OR CREATE A NEW ONE
    // 
    // ###############################################################################

    // Create a Hydrant
    const newHydrant = {
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        updated_by: req.body.updated_by,
        data: req.body.data,
    };
    // Save Hydrant in the database
    try {
        const hydrant = await Hydrant.create(newHydrant);
        res.send(hydrant);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while creating the Hydrant.',
        });
    }
}

// Update a Hydrant by the id in the request
const update = async (req, res) => {
    // Validate request
    if (!req.body.latitude) {
        res.status(400).send({
            message: 'Latitude can not be empty!',
        });
        return;
    }
    if (!req.body.longitude) {
        res.status(400).send({
            message: 'Longitude can not be empty!',
        });
        return;
    }
    if (!req.body.data) {
        res.status(400).send({
            message: 'Data can not be empty!',
        });
        return;
    }

    // ###############################################################################
    //
    // IN THE FUTURE, MANAGE WHEN UPDATE AN HYDRANT TO STORING THE PREVIOUS DATA IN A HISTORY
    //
    // ###############################################################################

    const id = req.params.id;
    const hydrant = {
        updated_by: req.body.updated_by,
        data: req.body.data,
    };
    try {
        const updatedHydrant = await Hydrant.update(hydrant, {
            where: { id: id },
        });
        if (updatedHydrant == 1) {
            res.send({
                message: 'Hydrant was updated successfully.',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error updating Hydrant with id=' + id,
        });
    }
}

// Delete a Hydrant with the specified id in the request
const deleteById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedHydrant = await Hydrant.destroy({
            where: { id: id },
        });
        if (deletedHydrant == 1) {
            res.send({
                message: 'Hydrant was deleted successfully!',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Could not delete Hydrant with id=' + id,
        });
    }
}

// Get all Hydrants ubications
const listAllUbications = async (req, res) => {
    try {
        const hydrants = await Hydrant.findAll({
            attributes: ['id', 'latitude', 'longitude'],
        });
        res.send(hydrants);
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Some error occurred while retrieving hydrants.',
        });
    }
}

// Get one Hydrant by id
const findById = async (req, res) => {
    const id = req.params.id;
    try {
        const hydrant = await Hydrant.findByPk(id);
        res.send(hydrant);
    } catch (error) {
        res.status(500).send({
            message: 'Error retrieving Hydrant with id=' + id,
        });
    }
}


module.exports = {
    create,
    update,
    deleteById,
    listAllUbications,
    findById,
};




