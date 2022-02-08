import React, {ReactElement, useContext} from "react";
import {Section} from "../components/Section";
import {AppContext} from "../components/AppContext";
import {Box, Button} from "@mui/material";
import {recreateChain} from "../../domain/hooks/useBlockchain";
import {TransactionsTable} from "../components/TransactionsTable";

export const Miner = (): ReactElement => {
    const {myCoin, setBlockchain, user} = useContext(AppContext);

    if (null === myCoin || null === user) {
        return <></>;
    }

    function handleClick() {
        if (null === user) {
            return;
        }
        myCoin?.minePendingTransactions(user.publicKey)
        const newChain = recreateChain(myCoin);
        setBlockchain(newChain);
    }

    return (
        <Section
            title={'Mine pending transactions'}
            subtitle={0 === myCoin.pendingTransactions.length ? 'No pending transactions' : 'Mine this block & earn 100 tokens, mining creates tokens assigned to you'}
        >
            <TransactionsTable transactions={myCoin.pendingTransactions}/>
            <Box mt={3}>
                <Button variant={'contained'} type={'submit'} color={'secondary'} onClick={handleClick}>
                    Mine block
                </Button>
            </Box>
        </Section>
    )
}
