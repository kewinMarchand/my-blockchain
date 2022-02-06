import {ec as EC} from "elliptic";
import KeyPair = EC.KeyPair;

/*const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log({publicKey});
console.log({privateKey});*/

export function getKeyPair(): KeyPair {
    const ec = new EC('secp256k1');
    const key = ec.genKeyPair();

    return key;
}
