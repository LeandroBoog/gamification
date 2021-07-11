
export default (sequelize, DataTypes) => {

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
        achievementCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
}
