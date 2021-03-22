const peopleService = require('../Services/People')
class PeopleController {

    constructor() {
        this.data = "PeopleController was here"
    }

    getData() {
        return "PeopleController was here"
    }

    addPerson(person) {
        console.log('CONTROLLER/PEOPLE: Person='+JSON.stringify(person))
        peopleService.addPerson(person)
    }

}

module.exports = new PeopleController()