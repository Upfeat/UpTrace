const Firestore = require('@google-cloud/firestore');
const { v4: uuidv4} = require('uuid')

class PlaceRepository {

    constructor() {
        this.PROJECT_ID = 'uptraceuofm'
        this.COLLECTION_NAME = 'Place'

        this.firestore = new Firestore({
            projectId: this.PROJECT_ID,
            timestampsInSnapshots: true,
          });
    }


    create(place) {
        const uuid = uuidv4();
        place["uuid"] = uuid
        this.firestore.collection(this.COLLECTION_NAME).doc(uuid).set(place)
    }

    async readFromID(uuid) {
        const docRef = this.firestore.collection(this.COLLECTION_NAME).doc(uuid)
        let place = docRef.get().then(documentSnapshot => {
            let docData = documentSnapshot.data()
            return docData
        })

        return place
    }

    async readAll() {
        var jsonCollection = await this.firestore.collection(this.COLLECTION_NAME).get()
        .then(querySnapshot => {
            let JSONData = querySnapshot.docs.map(doc => doc.data())
            return JSONData
        });

        const JSONCollectionStr = JSON.stringify(jsonCollection)
        return JSONCollectionStr
    }

    update(place) {
        const docRef = this.firestore.collection(this.COLLECTION_NAME).doc(place.uuid)
        docRef.update(place).then(res => {
            console.log(`Document updated at ${res.updateTime}`);
          });
    }

    delete(id) {
        const docRef = this.firestore.collection(this.COLLECTION_NAME).doc(id)
        docRef.delete().then(() => {
            console.log('Document successfully deleted.');
          });
    }
}

module.exports = new PersonRepository();
