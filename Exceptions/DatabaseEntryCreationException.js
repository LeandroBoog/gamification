
class DatabaseEntryCreationException extends Error {

    constructor(message) {
        super(message);
        this.name = "DatabaseEntryCreationException"
    }
}

export default  DatabaseEntryCreationException