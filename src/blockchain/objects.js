import bs58 from 'bs58'
import {
    crypto
} from 'bitcoinjs-lib'
import Key from './key'
import Storage from './storage'
import {formatedTime} from '../utils'
import {BlockData} from './protos/objects'

class Block {

    constructor(data = null) {

        this.blockHash = ''
        this.prevHash = ''
        this.time = new Date()
        this.signature = ''
        this.chainId = ''
        this.height = 0
        this.payload = ''

        if (data != null) {
            this.blockHash = data['hash']
            this.prevHash = data['prev_hash']
            this.time = new Date(data['time'] * 1000) // utc time ignored millisecond part
            this.signature = data['signature']
            this.height = data['height']
            this.chainId = data['chain_id']
            this.payload = data['payload']
        }
    }

    static fromBytes(data) {
        let blockInfo = BlockData.decode(data)
        // I'm not sure whether it's ok to pass block info directly
        let block = {
            'time': blockInfo.time,
            'hash': blockInfo.hash,
            'prev_hash': blockInfo.prevHash,
            'signature': blockInfo.signature,
            'chain_id': blockInfo.chainId,
            'height': blockInfo.height,
            'payload': blockInfo.payload
        }

        return new Block(block)
    }

    get isGenesis() {
        return this.height === 0
    }

    get utctime() {
        // return utctime: string
        let utcTimeStr = this.time.getTime().toString()
        return utcTimeStr.slice(0, 10) // ignore millisecond
    }

    get dict() {
        let data = {
            'hash': this.blockHash,
            'time': parseInt(this.utctime),
            'signature': this.signature,
            'chain_id': this.chainId,
            'height': this.height,
            'payload': this.payload
        }
        if (this.prevHash != null && this.prevHash.length > 0)
            data['prev_hash'] = this.prevHash
        return data
    }

    get dataForHashing() {
        let data = this.dict
        delete data['hash']
        delete data['signature']
        // let dataStr = JSON.stringify(data, Object.keys(data).sort())
        // console.log(Buffer.from(dataStr, 'utf8'))
        // chainId or chain_id, does this influent on the final binary output
        let blockInfo = BlockData.create({
            time: parseInt(this.utctime),
            chainId: this.chainId,
            height: this.height,
            payload: this.payload,
            prevHash: this.prevHash
        })
        let protoData = BlockData.encode(blockInfo).finish()    // Uint8Array(214)
        let arrayBuf = protoData.buffer         // ArrayBuffer(8192)
        // var buf = new Buffer(arrayBuf.byteLength)
        // var view = new Uint8Array(arrayBuf)
        // for (var i = 0; i < buf.length; ++i) {
        //     buf[i] = view[i]
        // }
        // return buf
        return Buffer.from(arrayBuf)        // Uint8Array(8192)
        // return Buffer.from(protoData.buffer)
        // return Buffer.from(dataStr, 'utf8')
    }



    get data() {
        // let dataStr = JSON.stringify(this.dict, Object.keys(this.dict).sort())
        let blockInfo = BlockData.create({
            time: parseInt(this.utctime),
            chainId: this.chainId,
            height: this.height,
            payload: this.payload,
            prevHash: this.prevHash,
            hash: this.blockHash,
            signature: this.signature
        })
        let protoData = BlockData.encode(blockInfo).finish()
        return Buffer.from(protoData.buffer)
        // return Buffer.from(dataStr, 'utf8')
    }

    get isValid() {
        let key = new Key(this.chainId)
        // console.log(bs58.encode(crypto.sha256(this.dataForHashing)) === this.blockHash, key.verify(this.signature, this.dataForHashing))
        return (this.height === 0 || (this.prevHash != null && this.prevHash.length > 0)) &&
            bs58.encode(crypto.sha256(this.dataForHashing)) === this.blockHash &&
            key.verify(this.signature, this.dataForHashing)
    }

    str() {
        return JSON.stringify(
            this.dict,
            Object.keys(this.dict).sort()
        )
    }
}


class Blockchain {

    static allChains() {
        let objects = (new Storage()).allChains()
        let chains = []
        for (let key of objects) {
            chains.push(new Blockchain(new Key(key['publick_key'], key['private_key'])))
        }
        return chains
    }

    static remoteChain(publicKey) {
        let chain = Blockchain.load(publicKey)
        if (chain == null) {
            let remote = new Blockchain(new Key(publicKey))
            remote.save()
            console.log('[' + formatedTime() + '] Chain saved:\n')
            return remote
        }
        return chain
    }

    static load(chainId) {
        /*
        Load a exist chain from database
        :param chain_id: chain id = public key
         */
        let info = (new Storage()).getChain(chainId)
        if (info != null) {
            if (info['private_key'] != null && info['private_key'].length > 0) { //undefined == null -> true, undefined == null -> false
                return new Blockchain(new Key(chainId, info['private_key']))
            }
            return new Blockchain(new Key(chainId))
        }
        return null
    }

    constructor(keyObj) {
        this.key = keyObj
        this.storage = new Storage()

        let genesis = this.getBlock(0)
        this.info = this.genesis != null ? JSON.parse(genesis.payload) : null
    }

    get id() {
        return this.key.publicKey
    }

    get isOwner() {
        return this.key.canSign
    }

    get height() {
        return this.storage.getHeight(this.id)
    }

    getBlock(height = null, blockHash = null) {
        // height: int; blockHash: String
        let info = this.storage.getBlock(this.id, height, blockHash)
        return info != null ? new Block(info) : null
    }

    getBlocks(start, end) {
        let infos = this.storage.getBlocks(this.id, start, end)
        if (infos == null) {
            return null
        }

        let blocks = []
        for (let info of infos) {
            blocks.push(new Block(info))
        }
        return blocks
    }

    createBlock(payload) {

        if (typeof payload !== 'string') {
            // throw 'Payload should be in string type'
            payload = JSON.stringify(payload, Object.keys(payload).sort())
        }

        let block = new Block()
        block.payload = payload
        block.chainId = this.id
        block.height = this.height
        if (block.height > 0) {
            block.prev_hash = this.storage.getBlock(this.id, block.height - 1).blockHash
        }
        block.blockHash = bs58.encode(crypto.sha256(block.dataForHashing, 'utf8'))
        block.signature = bs58.encode(this.key.sign(block.dataForHashing))
    }

    saveBlock(block) {
        if (block.isValid && this.getBlock(block.height) == null) {
            // this.height will not call get method here    
            if (this.storage.getHeight(this.id) === 0) {
                this.storage.saveBlock(block.dict)
                return true
            } else if (this.storage.getHeight(this.id) > 0) {
                let prevBlock = this.getBlock(block.height - 1)
                if (prevBlock.blockHash === block.prevHash) {
                    this.storage.saveBlock(block.dict)
                    return true
                }
            }
        } else {
            console.log('Block ' + block.height + ' is invalid')
        }
        return false
    }

    save() {
        if (Blockchain.load(this.id) == null) {
            this.storage.saveChain({
                'public_key': this.key.publicKey,
                'private_key': this.key.privateKey
            })
            return true
        }
        return false
    }

    getItem(key) {
        if (typeof key === 'number') {
            return new Block(this.storage.getBlock(this.id, key, null))
        } else if (typeof key === 'string') {
            return new Block(this.storage.getBlock(this.id, null, key))
        }
        return null
    }
}


export {
    Block,
    Blockchain
}