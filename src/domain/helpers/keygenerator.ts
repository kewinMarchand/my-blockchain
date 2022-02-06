import {ec as EC} from "elliptic";
import KeyPair = EC.KeyPair;

/*
const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');
*/

export function getKeyPair(): KeyPair {
    const ec = new EC('secp256k1');

    return ec.genKeyPair();
}

export function getKeyFromPrivate(privateKey: string): KeyPair {
    const ec = new EC('secp256k1');

    return ec.keyFromPrivate(privateKey, 'hex');
}

