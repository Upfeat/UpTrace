const { HelloService } = require('./Services/HelloService')
var helloService = require('./Services/HelloService')

exports.HelloController =  (req, res) => {
    res.send(helloService.data)
}