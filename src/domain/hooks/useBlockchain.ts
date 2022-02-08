import {Dispatch, useEffect, useState} from "react";
import {Block} from "../model/Block";
import {Blockchain} from "../model/Blockchain";
import {Transaction} from "../model/Transaction";

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

const storeChain = (chain: Blockchain|null) => {
    if (null === chain) {
        return;
    }
    localStorage.setItem('chain', JSON.stringify(chain));
}

export const useBlockchain = (): [Blockchain|null, Dispatch<any>] => {
    const [blockchain, setBlockchain] = useState<Blockchain|null>(null);

    function getChain() {
        let chainFromStorage = localStorage.getItem('chain');
        let chain;
        if (null !== chainFromStorage) {
            chain = recreateChain(JSON.parse(chainFromStorage));
        } else {
            chain = new Blockchain([new Block(Date.parse('2022-01-01'), [], '#')]);
        }
        setBlockchain(chain);
    }

    useEffect(getChain, []);
    useEffect(() => storeChain(blockchain), [blockchain]);

    //console.log({blockchain});

    return [blockchain, setBlockchain];
}
