
import config from "../config"
import { Sequelize } from 'sequelize'
import setupAssociations from "./setupAssociations";

import Achievement from './models/Achievement.model'
import Stats from './models/Stats.model'
import Student from './models/Student.model'
import Team from './models/Team.model'


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
    setupModel(sequelize)
}

setupAssociations(sequelize)

export default sequelize
