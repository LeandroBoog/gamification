
function setupAssociations(sequelize) {

    const { student, achievement, team } = sequelize.models

    team.hasMany(student)
    student.belongsTo(team)

    team.belongsToMany(achievement, { through: 'team_achievements' })
    achievement.belongsToMany(team, { through: 'team_achievements'})
}

module.exports = setupAssociations