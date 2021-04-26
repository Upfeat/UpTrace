const placesService = require('../Services/Places')
class PlacesController {

    constructor() {
    }

    async readAll() {
        let places = await placesService.readAll();
        console.log("Reading places: " + places)
        return places
    }

    addPlace(place) {
        console.log("PLACE CONTROLLER: " +place)

        placesService.addPlace(place)
        return place;
    }

    async readPlaceFromID(data) {
        return await placesService.readPlaceFromID(data.uuid)
    }

    updatePlace(place) {
        placesService.updatePlace(place)
    }

    deletePlace(data) {
        placesService.deletePlace(data.uuid)
    }

}

module.exports = new PlacesController()