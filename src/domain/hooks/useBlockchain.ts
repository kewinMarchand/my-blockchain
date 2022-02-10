import {Dispatch, useEffect, useState} from "react";
import {Block} from "../model/Block";
import {Blockchain} from "../model/Blockchain";
import {Transaction} from "../model/Transaction";

function recreateBlock(block: Block): Block {
    let recreatedTransactions: any[] = [];
    if (0 < block.transactions.length) {
        block.transactions.forEach(transaction => {
            recreatedTransactions.push(new Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount, transaction.signature));
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

export function useBlockchain(): [Blockchain|null, Dispatch<any>] {
    const [blockchain, setBlockchain] = useState<Blockchain|null>(null);

    function getChain() {
        const chainFromStorage = localStorage.getItem('chain');
        if (null !== chainFromStorage) {
            setBlockchain(recreateChain(JSON.parse(chainFromStorage)));
        } else {
            setBlockchain(new Blockchain([new Block(Date.parse('2022-01-01'), [], '#')]));
        }
    }

    function storeChain (chain: Blockchain|null) {
        if (null !== chain) {
            localStorage.setItem('chain', JSON.stringify(chain));
        }
    }

    useEffect(getChain, []);
    useEffect(() => storeChain(blockchain), [blockchain]);

    //console.log({blockchain});

    return [blockchain, setBlockchain];
}
