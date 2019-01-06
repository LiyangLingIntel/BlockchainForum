import bigInt from 'big-integer'
// import {bigNumber} from 'bignumber.js'


let bigIntToBuffer = (bigValue) => {
    let bufArr = []
    let quotient = bigValue
    while(quotient.isZero() === false) {
        let result = quotient.divmod(256)
        quotient = result.quotient
        bufArr.unshift(result.remainder)
    }
    return Buffer.from(bufArr)
}

let bufferToBigInt = (buf) => {
    let result = bigInt(0)
    let len = buf.length
    for (let i=0; i<len; i++) {
        
        result = result.plus(
            bigInt(buf[i]).multiply(
                bigInt(256).pow(len-i-1)
            )
        )
    }
    return result
}


export {bigIntToBuffer, bufferToBigInt}
