
class NotInDatabaseException extends Error {

    constructor(message) {
        super(message);
        this.name = "NotInDatabaseException"
        this.status = 404
    }
}

export default NotInDatabaseException