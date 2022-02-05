import React, {ReactElement, useContext} from "react";
import {AppContext} from "./AppContext";
import {
    Dialog,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Transaction} from "../../domain/model/Transaction";

export const TransactionsDialog = (): ReactElement => {
    const {blockTransactions, storeBlockTransactions} = useContext(AppContext);

    function handleClickAway() {
        storeBlockTransactions(null);
    }

    return (
        <>
            {null !== blockTransactions &&
                <Dialog open onClose={handleClickAway} maxWidth={'xl'}>
                    <Typography variant={'h2'} align={'center'} py={3}>
                        Transactions
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650, maxWidth: '100%'}} aria-label="simple table">
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
                                    blockTransactions.map((tx: Transaction) => (
                                        <TableRow key={tx.timestamp}>
                                            <TableCell component="th" scope="row">
                                                {tx.amount}
                                            </TableCell>
                                            <TableCell style={{maxWidth: 150}}>
                                                <Typography className={'text-croped'}>
                                                    {tx.fromAddress ?? 'Server'}
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
                </Dialog>
            }
        </>
    );
}
