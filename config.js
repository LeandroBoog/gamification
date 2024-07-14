
import cryptoRandomString from 'crypto-random-string'

const DOMAIN = encodeURI('your-domain-name');
const PORT = 3000;

export default {

    DOMAIN,
    PORT,

    // the gitlab url
    GITLAB_INSTANCE: "",
    // needed to read the repos
    GITLAB_READ_TOKEN: "",
    // needed to create the web hooks for the student repos
    GITLAB_WRITE_TOKEN: "",
    // needed to identify which group you wish to run the achievemt system on
    GITLAB_GROUP_NAME: "",

    STUDENT_GITLAB_RANK: 'Developer',

    DB_PATH: 'your-database-path/gamification.sqlite',

    WEBHOOK_URL: encodeURI(`${DOMAIN}:${PORT}/api/hook`),
    WEBHOOK_TOKEN: 'somesecrettoken' || cryptoRandomString({ length: 20 }),

    RANKS: {
        'No access': 0,
        'Minimal access': 5,
        'Guest': 10,
        'Reporter': 20,
        'Developer': 30,
        'Maintainer': 40,
        'Owner': 50
    },
}
