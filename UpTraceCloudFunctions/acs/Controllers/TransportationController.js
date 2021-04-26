const transportationService = require('../Services/Transportation')
class TransportationController {

    constructor() {
    }

    async readAll() {
        let transportation = await transportationService.readAll();
        console.log("Reading transportation: " + transportation)
        return transportation
    }

    addTransportation(transportation) {
        console.log("Transportation CONTROLLER: " +transportation)

        transportationService.addTransportation(transportation)
        return transportation;
    }

    async readTransportationFromID(data) {
        return await transportationService.readTransportationFromID(data.uuid)
    }

    updateTransportation(transportation) {
        transportationService.updateTransportation(transportation)
    }

    deleteTransportation(data) {
        transportationService.deleteTransportation(data.uuid)
    }

}

module.exports = new TransportationController()