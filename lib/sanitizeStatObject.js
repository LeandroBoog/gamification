
function sanitizeStatObject(data, studentEmail) {

    data.changes.authors = mapStudentStats(
        data.changes.authors,
        studentEmail,
        'percentage_of_changes')

    data.blame.authors = mapStudentStats(
        data.blame.authors,
        studentEmail,
        'percentage_in_comments')

    return data
}

function mapStudentStats(authors, studentEmail, percentAttribute) {

    let staff = []
    let students = []

    for(const author of authors) {
        (studentEmail.includes(author.email) ? students : staff).push(author)
    }

    const factor = calculateFactor(staff, percentAttribute)

    students = students.map(student => {
        student[percentAttribute] = parseFloat((student[percentAttribute] * factor).toFixed(2))
        return student
    })

    return students
}

function calculateFactor(staff, percentAttribute) {

    if(staff.length === 0) return 1.0

    let percentage = 0.0
    for(const s of staff) {
        const staffPercentage = s[percentAttribute]
        if(typeof staffPercentage === 'number') percentage += staffPercentage
    }

    if(percentage === 0) return 1.0
    return 100.0 / (100.0 - percentage)
}

module.exports = sanitizeStatObject