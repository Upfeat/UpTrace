const repository = require('../Repositories/PlaceCategoryRepository')

class PlaceCategory {

    constructor() {

    }

    addPlaceCategory(placeCategory) {
        console.log("Transportation SERVICE: " +placeCategory)

        repository.create(placeCategory);
    }

    async readPlaceCategoryFromID(id) {
        const placeCategory = await repository.readFromID(id)
        return placeCategory
    }

    async readAll() {
        return await repository.readAll();
    }

    updatePlaceCategory(placeCategory) {
        repository.update(placeCategory)
    }

    deletePlaceCategory(id) {
        repository.delete(id)
    }
}

module.exports = new PlaceCategory();
