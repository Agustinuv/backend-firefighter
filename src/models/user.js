'use stict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    }
    User.init({
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'User',
    });
    User.beforeCreate((user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        user.id = uuid.v4();
    });
    User.beforeUpdate((user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
}