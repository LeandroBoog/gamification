
function setupAssociations(sequelize) {

    const { student, achievement, team, stats } = sequelize.models

    team.hasMany(student)
    student.belongsTo(team)

    team.belongsToMany(achievement, { through: 'team_achievements' })
    achievement.belongsToMany(team, { through: 'team_achievements'})

    stats.hasOne(team)
    team.belongsTo(stats)
}

module.exports = setupAssociations