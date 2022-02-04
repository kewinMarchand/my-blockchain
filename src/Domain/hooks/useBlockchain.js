import {useEffect, useState} from "react";
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

/**
 *
 * @param tx
 * @param signinKey
 */
function signTransaction(tx, signinKey) {
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

/**
 *
 * @param block
 * @returns {Block}
 */
function recreateBlock(block) {
    let recreatedTransactions = [];
    if (0 < block.transactions.length) {
        block.transactions.forEach(transaction => {
            const tx = new Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount)
            signTransaction(tx, myWalletAddress === transaction.fromAddress ? myKey : otherKey);
            recreatedTransactions.push(tx);
        })
    }

    return new Block(block.timestamp, recreatedTransactions, block.previousHash, block.hash);
}

/**
 *
 * @param parsedChain
 * @returns {Blockchain}
 */
function recreateChain(parsedChain) {
    let recreatedChain = [];
    parsedChain.chain.forEach(block => {
        recreatedChain.push(recreateBlock(block));
    })

    return new Blockchain(recreatedChain, parsedChain.difficulty, parsedChain.pendingTransactions, parsedChain.miningReward, parsedChain.chainValue);
}

/**
 *
 * @returns {[unknown, ((value: unknown) => void)]}
 */
export const useBlockchain = () => {
    const [blockchain, setBlockchain] = useState(null);

    /**
     *
     * @param chain
     */
    function storeChain(chain) {
        localStorage.setItem('chain', JSON.stringify(chain));
        setBlockchain(chain);

        console.log(chain)
    }

    /**
     *
     */
    function getChain() {
        let chainFromStorage = localStorage.getItem('chain');
        if (null !== chainFromStorage) {
            storeChain(recreateChain(JSON.parse(chainFromStorage)));
        } else {
            createFirstBlock(new Blockchain());
        }

    }

    /**
     *
     * @param chain
     */
    function createFirstBlock(chain) {
        if (null === chain) {
            return;
        }
        console.log('My balance is', chain.getBalanceOfAddress(myWalletAddress));

        const tx1 = new Transaction(myWalletAddress, otherWalletAddress, 10);
        tx1.signTransaction(myKey);
        chain.addTransaction(tx1);

        const tx2 = new Transaction(myWalletAddress, otherWalletAddress, 30);
        tx2.signTransaction(myKey);
        chain.addTransaction(tx2);

        const tx3 = new Transaction(otherWalletAddress, myWalletAddress, 30);
        tx3.signTransaction(otherKey);
        chain.addTransaction(tx3);

        //console.log('Starting the miner...');
        chain.minePendingTransactions(myWalletAddress);

        if (chain.isChainValid()) {
            console.log('My balance is', chain.getBalanceOfAddress(myWalletAddress));
            console.log('Other balance is', chain.getBalanceOfAddress(otherWalletAddress));
            console.log('My Transactions:', chain.getAllTransactionsForWallet(myWalletAddress));
            storeChain(chain);
        }
    }

    useEffect(getChain, []);

    return [blockchain, setBlockchain]
}