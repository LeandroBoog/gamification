
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('achievement', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }

    });
}
