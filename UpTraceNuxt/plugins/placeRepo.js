import { fireDb } from "~/plugins/firebase";

class PlaceRepository {

    constructor() {
        this.COLLECTION_NAME = 'Places'
    }

    create(place) {
        const { v4: uuidv4} = require('uuid')
        const uuid = uuidv4();
        place["uuid"] = uuid
        fireDb.collection(this.COLLECTION_NAME).doc(uuid).set(place)
    }

    async checkForEmail(email) {
        const placeRef = fireDb.collection(this.COLLECTION_NAME)
        const queryRef = placeRef.where('email', '==', email)
        const placeDoc = await queryRef.get()
        console.log("docs found: " + placeDoc.docs.length)
        return placeDoc.docs.length > 0
    }

    
}
const placeRepo = new PlaceRepository()
export default placeRepo