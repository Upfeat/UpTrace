const repository = require('../Repositories/PersonRepository')

class People {

    constructor() {

    }

    addPerson(person) {
        repository.create(person);
    }

    async readPersonFromID(id) {
        const person = await repository.readFromID(id)
        return person
    }

    async readAll() {
        return await repository.readAll();
    }

    updatePerson(person) {
        console.log("SERVICE - UPDATING PERSON: " + JSON.stringify(person))
        repository.update(person)
    }

    deletePerson(id) {
        repository.delete(id)
    }
}

module.exports = new People();
