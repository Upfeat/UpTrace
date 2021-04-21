
import { fireDb } from "~/plugins/firebase";
import encryptionService from "~/plugins/encryption.js"

class PersonRepository {

    constructor() {
        this.COLLECTION_NAME = 'People'
        this.encryptedKeys = ['firstName','lastName','address','address2','postalCode','phoneNumber','emailAddress']
    }

    create(person) {

        let encryptedPerson = JSON.parse(JSON.stringify(person))
        let keys = Object.keys(encryptedPerson)
        for(let key of keys) {
            if(this.encryptedKeys.includes(key)) {
                encryptedPerson[key] = encryptionService.encrypt(encryptedPerson[key])
            }
        }
        const { v4: uuidv4} = require('uuid')
        const uuid = uuidv4();
        encryptedPerson["uuid"] = uuid
        fireDb.collection(this.COLLECTION_NAME).doc(uuid).set(encryptedPerson)
    }
    
    async checkForEmail(email) {
        const encryptedEmail = encryptionService.encrypt(email)
        const peopleRef = fireDb.collection('People')
        const queryRef = peopleRef.where('emailAddress', '==', encryptedEmail)
        const personDoc = await queryRef.get()
        console.log("docs found: " + personDoc.docs.length)
        return personDoc.docs.length > 0
    }

    async getUUID(email) {
        const encryptedEmail = encryptionService.encrypt(email)
        const peopleRef = fireDb.collection('People')
        const queryRef = peopleRef.where('emailAddress', '==', encryptedEmail)
        const personDoc = await queryRef.get()
        console.log(personDoc.docs[0].id)

        return personDoc.docs[0].id

    }

}
const personRepo = new PersonRepository()
export default personRepo