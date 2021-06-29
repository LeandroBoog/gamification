
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('teamstats', {

        number_of_commits: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        average_commit_time: {
            type: DataTypes.STRING,
            defaultValue: "00:00"
        },
        used_second_chance: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
}
