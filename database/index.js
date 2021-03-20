
const config = require('../config')
const { Sequelize } = require('sequelize');
const setupAssociations = require('./setupAssociations')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: config.DB_PATH,
    define: { freezeTableName: true }
});

const models = [
    require('./models/Student.model'),
    require('./models/Achievement.model'),
    require('./models/Team.model')
];

for (const setupModel of models) {
    setupModel(sequelize)
}

setupAssociations(sequelize)

module.exports = sequelize
