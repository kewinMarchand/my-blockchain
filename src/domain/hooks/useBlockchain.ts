import {Dispatch, useEffect, useState} from "react";
import {ec as EC} from "elliptic";
import {Block} from "../model/Block";
import {Blockchain} from "../model/Blockchain";
import {Transaction} from "../model/Transaction";

/*test keys*/
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('ca2d1c0a2e79cf08f6b2f0a2e275b61f3b690af74f9aae925e7a5f301b156927');
const myWalletAddress = myKey.getPublic('hex');

const otherKey = ec.keyFromPrivate('1ba948a551407a073e9a1412cc98cbe5d37872fb691d7a7f4c2742efbd007cc4');
const otherWalletAddress = otherKey.getPublic('hex');
/*test keys*/

function signTransaction(tx: Transaction, signinKey: any) {
    if (null === tx.fromAddress) {
        const hashTx = tx.calculateHash();
        const sig = signinKey.sign(hashTx, 'base64');
        tx.signature = sig.toDER('hex');

        return;
    }

    if (signinKey.getPublic('hex') !== tx.fromAddress) {
        throw new Error('You cannot sign transactions for other wallet');
    }

    const hashTx = tx.calculateHash();
    const sig = signinKey.sign(hashTx, 'base64');
    tx.signature = sig.toDER('hex');
}

function recreateBlock(block: Block): Block {
    let recreatedTransactions: any[] = [];
    if (0 < block.transactions.length) {
        block.transactions.forEach(transaction => {
            const tx = new Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount, transaction.signature)
            recreatedTransactions.push(tx);
        })
    }

    return new Block(block.timestamp, recreatedTransactions, block.previousHash, block.hash);
}

export function recreateChain(parsedChain: any): Blockchain {
    let recreatedChain: Block[] = [];
    parsedChain.chain.forEach((block: Block) => {
        recreatedChain.push(recreateBlock(block));
    })

    return new Blockchain(recreatedChain, parsedChain.difficulty, parsedChain.pendingTransactions, parsedChain.miningReward, parsedChain.chainValue);
}


export const useBlockchain = (): [Blockchain|null, Dispatch<any>] => {
    const [blockchain, setBlockchain] = useState<Blockchain|null>(null);

    function storeChain(chain: Blockchain) {
        localStorage.setItem('chain', JSON.stringify(chain));
        setBlockchain(chain);
    }

    function getChain() {
        let chainFromStorage = localStorage.getItem('chain');
        if (null !== chainFromStorage) {
            storeChain(recreateChain(JSON.parse(chainFromStorage)));
        } else {
            storeChain(new Blockchain())
        }

    }

    useEffect(getChain, []);

    //console.log({blockchain});

    return [blockchain, storeChain]
}