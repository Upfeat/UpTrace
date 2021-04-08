const peopleService = require('../Services/People')
class PeopleController {

    constructor() {
        this.data = "PeopleController was here"
    }

    async readAll() {
        return await peopleService.readAll();
    }

    getData() {
        return this.data
    }

    addPerson(person) {
        peopleService.addPerson(person)
        return person;
    }

    async readPersonFromID(data) {
        return await peopleService.readPersonFromID(data.uuid)
    }

    updatePerson(person) {
        console.log("CONTROLLER - UPDATING PERSON: " + JSON.stringify(person))
        peopleService.updatePerson(person)
    }

    deletePerson(data) {
        peopleService.deletePerson(data.uuid)
    }

}

module.exports = new PeopleController()