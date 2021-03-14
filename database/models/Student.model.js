
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('student', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true }
        },
        user_username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        number_of_commits: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }

    });
}
