import React, {ReactElement, useContext} from "react";
import {AppContext} from "./AppContext";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {Transaction} from "../../domain/model/Transaction";

export const TransactionsTable = ({transactions}: {transactions: Transaction[]}): ReactElement => {
    const {myCoin} = useContext(AppContext);

    return (
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
                    {0 === transactions.length ?
                        <TableRow>
                            <TableCell colSpan={5} align={'center'}>
                                No transactions yet.
                            </TableCell>
                        </TableRow>
                        :
                        transactions.map((tx: Transaction) => (
                            <TableRow key={tx.timestamp}>
                                <TableCell style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                    <img src={myCoin.icon} alt={'token'} height={16} width={16}/>
                                    {tx.amount}
                                </TableCell>
                                <TableCell style={{maxWidth: 150}} className={'text-croped'}>
                                    {tx.fromAddress ?? 'Server'}
                                </TableCell>
                                <TableCell style={{maxWidth: 150}} className={'text-croped'}>
                                    {tx.toAddress}
                                </TableCell>
                                <TableCell style={{maxWidth: 150}} className={'text-croped'}>
                                    {tx.timestamp}
                                </TableCell>
                                <TableCell style={{maxWidth: 150}} className={'text-croped'}>
                                    {tx.signature}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
