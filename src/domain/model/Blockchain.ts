import {Block} from "./Block";
import {Transaction} from "./Transaction";
import blockchainIcon from '../../ui/assets/blockchainIcon.png';

export class Blockchain {
    public chain: Block[];
    public difficulty: number;
    public pendingTransactions: Transaction[];
    public miningReward: number;
    public chainValue: number;
    public icon: string;

    // @ts-ignore
    constructor(chain: Block[], difficulty = 2, pendingTransactions: Transaction[] = [], miningReward= 100, chainValue = 0) {
        this.chain = chain;
        this.difficulty = difficulty;
        this.pendingTransactions = pendingTransactions;
        this.miningReward = miningReward;
        this.chainValue = chainValue;
        this.icon = blockchainIcon;
    }

    createGenesisBlock(): Block {
        return new Block(Date.parse('2017-01-01'), [], '0');
    }

    /**
     * Returns the latest block on our chain. Useful when you want to create a
     * new Block and you need the hash of the previous Block.
     */
    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Takes all the pending transactions, puts them in a Block and starts the
     * mining process. It also adds a transaction to send the mining reward to
     * the given address.
     */
    minePendingTransactions(miningRewardAddress: any) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);
        this.chainValue += this.miningReward;

        let block = new Block(Date.now(),this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    /**
     * Add a new transaction to the list of pending transactions (to be added
     * next time the mining process starts). This verifies that the given
     * transaction is properly signed.
     */
    addTransaction(transaction: Transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        // Verify the transaction
        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }

        if (transaction.amount <= 0) {
            throw new Error('Transaction amount should be higher than 0');
        }

        this.pendingTransactions.push(transaction);
    }

    /**
     * Returns the balance of a given wallet address.
     */
    getBalanceOfAddress(address: any): number {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    /**
     * Returns a list of all transactions that happened
     * to and from the given wallet address.
     */
    getAllTransactionsForWallet(address: any): Transaction[] {
        const txs = [];

        for (const block of this.chain) {
            for (const tx of block.transactions) {
                if (tx.fromAddress === address || tx.toAddress === address) {
                    txs.push(tx);
                }
            }
        }

        return txs;
    }

    /**
     * Loops over all the blocks in the chain and verify if they are properly
     * linked together and nobody has tampered with the hashes. By checking
     * the blocks it also verifies the (signed) transactions inside of them.
     */
    isChainValid(): boolean {
        // Check if the Genesis block hasn't been tampered with by comparing
        // the output of createGenesisBlock with the first block on our chain
        const realGenesis = JSON.stringify(this.createGenesisBlock());

        if (realGenesis !== JSON.stringify(this.chain[0])) {
            return false;
        }

        // Check the remaining blocks on the chain to see if there hashes and
        // signatures are correct
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
        }

        return true;
    }
}
