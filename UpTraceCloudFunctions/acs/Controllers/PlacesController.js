const placesService = require('../Services/Places')
class placesController {

    constructor() {
    }

    async readAll() {
        return await placesService.readAll();
    }

    addPlace(place) {
        placesService.addPerson(place)
        return person;
    }

    async readPlaceFromID(data) {
        return await placesService.readPersonFromID(data.uuid)
    }

    updatePlace(place) {
        placesService.updatePerson(place)
    }

    deletePlace(data) {
        placesService.deletePerson(data.uuid)
    }

}

module.exports = new PlacesController()