const Firestore = require('@google-cloud/firestore');
const { v4: uuidv4} = require('uuid')

class TransportationRepository {

    constructor() {
        //NEEDS TO BE CHANGED
        this.PROJECT_ID = 'uptraceuofm'
        //////////////////////////////
        
        this.COLLECTION_NAME = 'Transportation'

        this.firestore = new Firestore({
            projectId: this.PROJECT_ID,
            timestampsInSnapshots: true,
          });
    }


    create(transportation) {
        console.log("TRANSPORTATION REPO: " +transportation)

        const uuid = uuidv4();
        transportation["uuid"] = uuid
        this.firestore.collection(this.COLLECTION_NAME).doc(uuid).set(transportation)
    }

    async readFromID(uuid) {
        console.log("TRANSPORTATION UUID = " + uuid)
        const docRef = this.firestore.collection(this.COLLECTION_NAME).doc(uuid)
        let transportation = docRef.get().then(documentSnapshot => {
            let docData = documentSnapshot.data()
            return docData
        })

        return transportation
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

    update(transportation) {
        const docRef = this.firestore.collection(this.COLLECTION_NAME).doc(transportation.uuid)
        docRef.update(transportation).then(res => {
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

module.exports = new TransportationRepository();
