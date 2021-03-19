const Firestore = require('@google-cloud/firestore');

class PersonRepository {

    constructor() {
        this.PROJECT_ID = 'attempt2-302520'
        this.COLLECTION_NAME = 'People'

        this.firestore = new Firestore({
            projectId: this.PROJECT_ID,
            timestampsInSnapshots: true,
          });
    }


    create(person) {
        this.firestore.collection(this.COLLECTION_NAME).doc(person.email).set({
            //GUID: person.GUID,
            firstName: person.firstName,
            lastName: person.lastName,
            address: person.address,
            address2: person.address2,
            city: person.city,
            provinceOrTerritory: person.provinceOrTerritory,
            postalCode: person.postalCode,
            phoneNumber: person.phoneNumber,
            email: person.email
        })

    }

    async read(email) {
        const userRef = this.firestore.collection(this.COLLECTION_NAME).doc(email);
        const doc = await userRef.get();
        return doc.email
    }

    update(email) {

    }

    delete(email) {

    }
}

module.exports = new PersonRepository();
