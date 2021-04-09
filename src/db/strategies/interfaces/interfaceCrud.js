class NotImplementedException extends Error {
    constructor() {
        super("Method Not Implemented Exception")
    }
}

class Icrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(query) {
        throw new NotImplementedException()
    }

    update(id, item) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }

    connect() {
        throw new NotImplementedException()
    }

    isConnected() {
        throw new NotImplementedException()
    }
}

module.exports = Icrud