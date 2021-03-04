class HelloService {
    constructor() {
    }

    get data() {
        return this.data
    }

    set data(data) {
        this.data = data
    }
}

module.exports.HelloService = new HelloService()