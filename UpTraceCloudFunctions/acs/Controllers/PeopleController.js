const peopleService = require('../Services/People')
class PeopleController {

    constructor() {
        this.data = "PeopleController was here"
    }

    getData() {
        return "PeopleController was here"
    }

    addPerson(person) {
        peopleService.addPerson(person)
    }

}

module.exports = new PeopleController()