
const sequelize = require('./database')

const Student = sequelize.models.student
const Achievement = sequelize.models.achievement
const Team = sequelize.models.team

async function a() {

    await sequelize.sync({ force: true });

    const res = await Student.bulkCreate([
        { user_id: 1234, user_name: "Jane", user_email: 'asd.a@gmx.de', user_username: "JanoYo" },
        { user_id: 1235, user_name: "Tom", user_email: 'tom.a@gmx.de', user_username: "TomAhawK" },
    ])

    const team1 = await Team.create({
        project_id: 1000,
        project_name: "smthbra",
        gitlab_group: "memo",
        year: "2020-2021",
    })

    show(team1)
    console.log('adding studs to team')
    await team1.addStudent(res[0])
    await team1.addStudent(res[1])

    let q = await Student.findAll()
    const studs = await team1.getStudents()
    //console.log(studs)
/*
    const team2 = await Team.create({
        team_name: "awodhawoda",
        gitlab_group: "memo",
        year: "2020-2021",
    })

    //team1.removeStudent(res[0])
    console.log('jere')
    team2.addStudent(res[0])
    q = await Student.findAll()
    console.log(JSON.stringify(q, null, 2))
*/}

a()

function show(b) {
    console.log(JSON.stringify(b, null, 2))
}
/*
    const team1 = await sequelize.models.Team.create({

        team_name: "wewo",
        gitlab_group: "memo",
        year: "2020-2021",
        Students: [{ name: "Jane", email: 'asd.a@gmx.de' }, { name: "Tom", email: 'tom.a@gmx.de' }]

    })

 */