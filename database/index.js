
import config from "../config.js"
import { Sequelize } from 'sequelize'
import setupAssociations from "./setupAssociations.js";

import Achievement from './models/Achievement.model.js'
import Stats from './models/Stats.model.js'
import Student from './models/Student.model.js'
import Team from './models/Team.model.js'


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: config.DB_PATH,
    define: { freezeTableName: true },
    logging: false
});

const models = [
    Achievement,
    Stats,
    Student,
    Team
];

for (const setupModel of models) {
    setupModel(sequelize, Sequelize)
}

setupAssociations(sequelize)

export default sequelize
