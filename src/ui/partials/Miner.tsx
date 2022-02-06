import React, {ReactElement, useContext} from "react";
import {Section} from "../components/Section";
import {AppContext} from "../components/AppContext";
import {Box, Button} from "@mui/material";
import {recreateChain} from "../../domain/hooks/useBlockchain";
import {TransactionsTable} from "../components/TransactionsTable";

export const Miner = (): ReactElement => {
    const {myCoin, setBlockchain, key} = useContext(AppContext);

    if (!myCoin) {
        return <></>;
    }

    function handleClick() {
        myCoin.minePendingTransactions(key.getPublic('hex'));
        setBlockchain(recreateChain(myCoin));
    }

    return (
        <Section
            title={'Mine pending transactions'}
            subtitle={0 === myCoin.pendingTransactions.length ? 'No pending transactions' : 'Mine this block & earn 100 tokens'}
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
