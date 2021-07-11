
import cryptoRandomString from 'crypto-random-string'


export default {

    PORT: 3000,

    GITLAB_INSTANCE: "gitlab.ibr.cs.tu-bs.de",
    GITLAB_READ_TOKEN: "f2Fweqd5ZhS-ja4yHKZx",
    GITLAB_WRITE_TOKEN: "CHZbVx9rTT8nChYtEfrm",
    GITLAB_GROUP_NAME: "bs-test-groups",
    //GITLAB_GROUP_NAME: "ws2021-bs-studs",
    STUDENT_GITLAB_RANK: 'Developer',

    DB_PATH: '/home/leandro/temp/gameification.sqlite',

    WEBHOOK_URL: encodeURI('http://tl.ddns.timoschwarzer.com:3000/api/hook'),
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