import React, {useContext} from "react";
import {AppContext} from "./AppContext";
import {
    ClickAwayListener,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Flexbox} from "./FlexBox";

export const TransactionsList = () => {
    const {blockTransactions, storeBlockTransactions} = useContext(AppContext);

    if (null === blockTransactions) {
        return (
            <Flexbox component={'section'} py={8}>
                <Typography align={'center'}>
                    Click on a block to see the transactions stored inside.
                </Typography>
            </Flexbox>

        )
    }

    function handleClickAway() {
        storeBlockTransactions(null);
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <section>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650, maxWidth: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>Signature</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {0 === blockTransactions.length ?
                                <TableRow>
                                    <TableCell/>
                                    <TableCell style={{maxWidth: 150}}/>
                                    <TableCell style={{maxWidth: 150}}/>
                                    <TableCell style={{maxWidth: 150}}/>
                                    <TableCell style={{maxWidth: 150}}/>
                                </TableRow>
                            :
                                blockTransactions.map((tx) => (
                                    <TableRow key={tx.timestamp}>
                                        <TableCell component="th" scope="row">
                                            {tx.amount}
                                        </TableCell>
                                        <TableCell style={{maxWidth: 150}}>
                                            <Typography className={'text-croped'}>
                                                {tx.fromAddress}
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{maxWidth: 150}}>
                                            <Typography className={'text-croped'}>
                                                {tx.toAddress}
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{maxWidth: 150}}>
                                            <Typography className={'text-croped'}>
                                                {tx.timestamp}
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{maxWidth: 150}}>
                                            <Typography className={'text-croped'}>
                                                {tx.signature}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </section>
        </ClickAwayListener>
    );
}
