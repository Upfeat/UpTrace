const Firestore = require('@google-cloud/firestore');
const { v4: uuidv4} = require('uuid')

class PlaceCategoryRepository {

    constructor() {
        //NEEDS TO BE CHANGED
        this.PROJECT_ID = 'uptraceuofm'
        //////////////////////////////

        this.COLLECTION_NAME = 'PlaceCategory'
        
        this.firestore = new Firestore({
            projectId: this.PROJECT_ID,
            timestampsInSnapshots: true,
          });
    }


    create(placeCategory) {
        console.log("placeCategory REPO: " +placeCategory)

        const uuid = uuidv4();
        placeCategory["uuid"] = uuid
        this.firestore.collection(this.COLLECTION_NAME).doc(uuid).set(placeCategory)
    }

    async readFromID(uuid) {
        console.log("TRANSPORTATION UUID = " + uuid)
        const docRef = this.firestore.collection(this.COLLECTION_NAME).doc(uuid)
        let placeCategory = docRef.get().then(documentSnapshot => {
            let docData = documentSnapshot.data()
            return docData
        })

        return placeCategory
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

    update(placeCategory) {
        const docRef = this.firestore.collection(this.COLLECTION_NAME).doc(placeCategory.uuid)
        docRef.update(placeCategory).then(res => {
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

module.exports = new PlaceCategoryRepository();
