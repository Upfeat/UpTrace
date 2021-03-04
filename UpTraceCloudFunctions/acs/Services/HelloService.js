class HelloService {
    constructor(data) {
        this.data = data
    }

    get data() {
        return this.data
    }

}

module.exports.HelloService = HelloService