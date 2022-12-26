const dotenv = require('dotenv');

const { User } = require('../models');
dotenv.config();

// Create and Save a new User
const singUp = async (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: 'Username can not be empty!',
        });
        return;
    }
    if (!req.body.email) {
        res.status(400).send({
            message: 'Email can not be empty!',
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
            message: 'Password can not be empty!',
        });
        return;
    }
    // check if user already 
    let user;
    user = await User.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (user) {
        res.status(400).send({
            message: 'Username already exists!',
        });
        return;
    }
    user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (user) {
        res.status(400).send({
            message: 'Email already exists!',
        });
        return;
    }

    // Create a User
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    // Save User in the database
    User.create(newUser)
        .then((data) => {
            res.send(data);
        }
        )
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the User.',
            });
        }
        );
};

// List all usernames and emails
const listAll = async (req, res) => {
    User.findAll({
        attributes: ['id', 'username', 'email'],
    })
        .then((data) => {
            if (data.length > 0) {
                res.send(data);
            }
            else {
                // response that there are no users yet
                res.status(404).send({
                    message: 'No users found.',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users.',
            });
        }
        );
};

module.exports = {
    singUp,
    listAll,
};


    