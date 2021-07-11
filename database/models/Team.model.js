
export default (sequelize, DataTypes) => {

    sequelize.define('team', {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gitlabGroup: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
}
