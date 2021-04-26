const repository = require('../Repositories/PlaceRepository')

class Places {

    constructor() {

    }

    addPlace(place) {
        console.log("PLACE SERVICE: " +place)

        repository.create(place);
    }

    async readPlaceFromID(id) {
        const place = await repository.readFromID(id)
        return place
    }

    async readAll() {
        return await repository.readAll();
    }

    updatePlace(place) {
        repository.update(place)
    }

    deletePlace(id) {
        repository.delete(id)
    }
}

module.exports = new Places();
