
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('team', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        project_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gitlab_group: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
}
