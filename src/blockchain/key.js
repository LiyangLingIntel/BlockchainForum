import bs58 from 'bs58'
import ECKey from 'ec-key'
import bigInt from 'big-integer'
// import {bigNumber} from 'bignumber.js'
import {bufferToBigInt, bigIntToBuffer} from '../utils'


class Key {

    constructor(publicKey = null, privateKey = null) {
        this._privateKey = null
        this._publicKey = null
        if (publicKey != null) {

            let pk = Key.decompress(bs58.decode(publicKey))
            let pkBuffer = pk.slice(1, pk.length)

            this._publicKey = new ECKey({
                'cty': 'EC',
                'crv': 'P-256',
                'x': pkBuffer.slice(0, pkBuffer.length / 2),
                'y': pkBuffer.slice(pkBuffer.length / 2, pkBuffer.length)
            })
            if (privateKey != null) {
                this._privateKey = new ECKey({
                    'cty': 'EC',
                    'crv': 'P-256',
                    'x': pkBuffer.slice(0, pkBuffer.length / 2),
                    'y': pkBuffer.slice(pkBuffer.length / 2, pkBuffer.length),
                    'd': bs58.decode(privateKey)
                })
            }
        } else {
            this._privateKey = ECKey.createECKey('P-256')
            this._publicKey = this._privateKey.asPublicECKey()
        }
    }

    compress(publicKey) {
        // compress to x
        // base58 encode compressed x
        // return bytes
        let x = publicKey.slice(1, 33)
        let y = publicKey.slice(33, 65)
        let flag = 2 + (y[y.length-1] & 1)
        return Buffer.concat([Buffer.from([flag]), x])
    }

    static decompress(publicKey) {
        // Constant number
        let prime = bigInt('115792089210356248762697446949407573530086143415290314195533631308867097853951')
        let pIdent = bigInt('28948022302589062190674361737351893382521535853822578548883407827216774463488')
        let b = bigInt('41058363725152142129326129780047268409114441015993725554835256314039467401291')
        let flag = publicKey[0] - 2
        let x = bufferToBigInt(publicKey.slice(1, 33))
        let y = (x.pow(3).minus(x.times(3)).plus(b)).modPow(prime, pIdent)

        if (y.mod(2) != flag) {
            y = prime.minus(y)
        }
        y = bigIntToBuffer(y)

        return Buffer.concat([Buffer.from([flag]), publicKey.slice(1, publicKey.length), y])
    }

    get publicKey() {
        let pk = this._publicKey
        let compressedKey = this.compress(Buffer.concat([Buffer.from([0x04]), pk.x, pk.y]))
        return bs58.encode(compressedKey)
    }

    get privateKey() {
        if (this._privateKey != null) {
            return bs58.encode(this._privateKey.d)
        }
        return null
    }

    get canSign() {
        return this._privateKey != null
    }

    sign(data) {
        // input should be Buffer type and return Buffer type signature
        if (!(data instanceof Buffer)) {
            throw 'Data to be signed should be Bytes type'
        }
        if (this.canSign) {
            return this._privateKey.createSign('SHA256').update(data).sign('buffer')
        } else {
            return null
        }
    }

    verify(signature, data) {
        // input should be Buffer type and return Boolean
        // console.log(bs58.decode(data))
        if (!(data instanceof Buffer)) {
            throw 'Data to be verified should be Bytes type'
        }
        try{
            return this._publicKey.createVerify('SHA256').update(data).verify(bs58.decode(signature), 'buffer')
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
}

export default Key