
module.exports = class DatabaseEntryCreationException extends Error {

    constructor(message) {
        super(message);
        this.name = "DatabaseEntryCreationException"
    }
}