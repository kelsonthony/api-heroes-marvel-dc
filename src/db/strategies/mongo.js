const Icrud = require('./../strategies/interfaces/interfaceCrud')

class MongoDB extends Icrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('The Item was Save on Mongo DB')
    }
}

module.exports = MongoDB