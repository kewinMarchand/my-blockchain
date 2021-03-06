import {Transaction} from "./Transaction";

const SHA256 = require("crypto-js/sha256");

export class Block {
    public previousHash: string;
    public nonce: number;
    public timestamp: number;
    public transactions: Transaction[];
    public hash: string;

    // @ts-ignore
    constructor(timestamp: number, transactions: Transaction[], previousHash = '', hash = this.calculateHash()) {
        this.nonce = 0;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = hash;
    }

    /**
     * Returns the SHA256 of this block (by processing all the data stored
     * inside this block)
     */
    calculateHash(): string {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    /**
     * Starts the mining process on the block. It changes the 'nonce' until the hash
     * of the block starts with enough zeros (= difficulty)
     */
     mineBlock(difficulty: number) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        //console.log(`Block mined: ${this.hash}`);
    }

    /**
     * Validates all the transactions inside this block (signature + hash) and
     * returns true if everything checks out. False if the block is invalid.
     */
    hasValidTransactions(): boolean {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
    }
}