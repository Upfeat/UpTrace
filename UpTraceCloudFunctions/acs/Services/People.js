const encryptionService = require('./EncryptionService')
//const repository = require('../Repositories/PersonRepository')

class People {

    constructor() {

    }

    addPerson(person) {
        const encryptedPerson = {
            firstName: encryptionService.encrypt(person.firstName),
            lastName: encryptionService.encrypt(person.lastName),
            address: encryptionService.encrypt(person.address),
            address2: encryptionService.encrypt(person.address2),
            city: person.city,
            provinceOrTerritory: person.provinceOrTerritory,
            postalCode: encryptionService.encrypt(person.postalCode),
            phoneNumber: encryptionService.encrypt(person.phoneNumber),
            email: encryptionService.encrypt(person.email)
        }

        console.log(JSON.stringify(encryptedPerson))
        //repository.create(encryptedPerson);
    }
}

module.exports = new People();
