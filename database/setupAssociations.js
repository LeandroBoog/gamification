
function setupAssociations(sequelize) {

    const { student, achievement, team, teamstats } = sequelize.models

    team.hasMany(student)
    student.belongsTo(team)

    team.belongsToMany(achievement, { through: 'team_achievements' })
    achievement.belongsToMany(team, { through: 'team_achievements'})

    teamstats.hasOne(team)
    team.belongsTo(teamstats)
}

module.exports = setupAssociations