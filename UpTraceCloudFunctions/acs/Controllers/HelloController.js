var helloService = require('../Services/HelloService')

module.exports = (req, res) => {
    res.send(helloService.data)
}