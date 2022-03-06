import CryptoJS from 'crypto-js'

const _key = "498tr@%¨&*(JUI*)_GHJ23tg"
export const encrypt = (text:string, key = _key) => {
    return CryptoJS.AES.encrypt(text, key).toString();
}

export const decrypt = (text:string, key = _key) => {
    var bytes  = CryptoJS.AES.decrypt(text, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
