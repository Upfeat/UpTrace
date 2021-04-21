const placeCategoryService = require('../Services/PlaceCategory')
class PlaceCategoryController {

    constructor() {
    }

    async readAll() {
        let placeCategory = await placeCategoryService.readAll();
        console.log("Reading transportation: " + placeCategory)
        return placeCategory
    }

    addPlaceCategory(placeCategory) {
        console.log("placeCategory CONTROLLER: " +placeCategory)

        placeCategoryService.addPlaceCategory(placeCategory)
        return placeCategory;
    }

    async readPlaceCategoryFromID(data) {
        return await placeCategoryService.readPlaceCategoryFromID(data.uuid)
    }

    updatePlaceCategory(placeCategory) {
        placeCategoryService.updatePlaceCategory(placeCategory)
    }

    deletePlaceCategory(data) {
        placeCategoryService.deletePlaceCategory(data.uuid)
    }

}

module.exports = new PlaceCategoryController()