var crypto = require('crypto');

class EncryptionService {

    constructor() {
        this.algorithm = 'aes-256-cbc'
        this.password = '1514c1fc28df51ce28fe788efd0b869b609be51509c588463385ae7ed7b5c7f2' 
        this.iv = '74933a71a17a8a4d3903bf141ddf1782' 
    }

    encrypt(value) {
        var buffer = Buffer.from(value, "utf8")
        var cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.password, 'hex'), Buffer.from(this.iv, 'hex'))
        var cryptedBuffer = Buffer.concat([cipher.update(buffer), cipher.final()])
        var crypted = cryptedBuffer.toString('hex')
        return crypted
    }

    decrypt(value) {
        var buffer = Buffer.from(value, "hex")
        var decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.password, 'hex'),  Buffer.from(this.iv, 'hex'))
        var decryptedBuffer = Buffer.concat([decipher.update(buffer), decipher.final()])
        var decrypted = decryptedBuffer.toString('utf-8')
        return decrypted
    }
}

module.exports = new EncryptionService()