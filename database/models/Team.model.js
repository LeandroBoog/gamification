
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('team', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        team_name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        number_of_unlocked_achievements: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        gitlab_group: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });
}
