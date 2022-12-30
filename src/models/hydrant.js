'use strict';

const { Model } = require('sequelize');
const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class Hydrant extends Model {
        static associate(models) {
            Hydrant.belongsTo(models.User, {
                foreignKey: 'updated_by',
                as: 'user',
            });
        }
    }
    Hydrant.init({
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        updated_by: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        data: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Hydrant',
    });
    Hydrant.beforeCreate((hydrant, options) => {
        hydrant.id = uuid.v4();
    });
    return Hydrant;
};