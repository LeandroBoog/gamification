
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('stats', {

        numberOfCommits: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        averageCommitTime: {
            type: DataTypes.STRING,
            defaultValue: "00:00"
        },
        usedSecondChance: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    });
}
