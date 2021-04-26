const repository = require('../Repositories/TransportationRepository')

class Transportation {

    constructor() {

    }

    addTransportation(transportation) {
        console.log("Transportation SERVICE: " +transportation)

        repository.create(transportation);
    }

    async readTransportationFromID(id) {
        const transportation = await repository.readFromID(id)
        return transportation
    }

    async readAll() {
        return await repository.readAll();
    }

    updateTransportation(transportation) {
        repository.update(transportation)
    }

    deleteTransportation(id) {
        repository.delete(id)
    }
}

module.exports = new Transportation();
