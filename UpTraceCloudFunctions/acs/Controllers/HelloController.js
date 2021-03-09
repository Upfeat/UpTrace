var helloService = require('./Services/HelloService.js')

exports.HelloController =  (req, res) => {
    res.send("Hello Controllers")
}