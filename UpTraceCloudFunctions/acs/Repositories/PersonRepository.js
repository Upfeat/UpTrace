const Firestore = require('@google-cloud/firestore');
const encryptionService = require('../Services/EncryptionService')
const { v4: uuidv4} = require('uuid')

class PersonRepository {

    constructor() {
        //NEEDS TO BE CHANGED
        this.PROJECT_ID = 'uptraceuofm'
        //////////////////////////////

        this.COLLECTION_NAME = 'People'
        this.encryptedKeys = ['firstName','lastName','address','address2','postalCode','phoneNumber','emailAddress']

        this.firestore = new Firestore({
            projectId: this.PROJECT_ID,
            timestampsInSnapshots: true,
          });
    }


    create(person) {
        let keys = Object.keys(person)
        for(let key of keys) {
            if(this.encryptedKeys.includes(key)) {
                person[key] = encryptionService.encrypt(person[key])
            }
        }
        const uuid = uuidv4();
        person["uuid"] = uuid
        this.firestore.collection(this.COLLECTION_NAME).doc(uuid).set(person)
    }

    async readFromID(uuid) {
        const docRef = this.firestore.collection(this.COLLECTION_NAME).doc(uuid)
        let person = docRef.get().then(documentSnapshot => {
            let docData = documentSnapshot.data()
            let keys = Object.keys(docData)
            for(let key of keys) {
                if(this.encryptedKeys.includes(key)) {
                    docData[key] = encryptionService.decrypt(docData[key])
                }
            }
            return docData
        })

        return person
    }

    async readAll() {
        var jsonCollection = await this.firestore.collection(this.COLLECTION_NAME).get()
        .then(querySnapshot => {
            let JSONData = querySnapshot.docs.map(doc => doc.data())
            for(var person in JSONData) {
                let keys = Object.keys(JSONData[person])
                for(var key of keys) {
                    if(this.encryptedKeys.includes(key)) {
                        JSONData[person][key] = encryptionService.decrypt(JSONData[person][key])
                    }
                }
            }
            return JSONData
        });

        const JSONCollectionStr = JSON.stringify(jsonCollection)
        return JSONCollectionStr
    }

    update(person) {
        console.log("REPOSITORY - UPDATING PERSON: " + JSON.stringify(person))

        let keys = Object.keys(person)
        console.log("KEYS = " + keys)
        for(let key of keys) {
            if(this.encryptedKeys.includes(key)) {
                person[key] = encryptionService.encrypt(person[key])
            }
        }

        const docRef = this.firestore.collection(this.COLLECTION_NAME).doc(person.uuid)
        docRef.update(person).then(res => {
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
