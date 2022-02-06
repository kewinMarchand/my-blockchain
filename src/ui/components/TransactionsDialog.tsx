import React, {ReactElement, useContext} from "react";
import {AppContext} from "./AppContext";
import {
    Dialog,
    Typography
} from "@mui/material";
import {TransactionsTable} from "./TransactionsTable";

export const TransactionsDialog = (): ReactElement => {
    const {blockTransactions, storeBlockTransactions} = useContext(AppContext);

    function handleClickAway() {
        storeBlockTransactions(null);
    }

    if (null === blockTransactions) {
        return <></>;
    }

    return (
        <Dialog open={true} onClose={handleClickAway} maxWidth={'xl'}>
            <Typography variant={'h2'} align={'center'} py={3}>
                Transactions
            </Typography>
            <TransactionsTable transactions={blockTransactions}/>
        </Dialog>
    );
}
