const { HelloService } = require('./Services/HelloService')
var service = require('./Services/HelloService')

exports.HelloController =  (req, res) => {
    service = new HelloService(req.data)
    res.send(service.data)
}