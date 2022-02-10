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
import {Block} from "../../domain/model/Block";
import {uiHelper} from "../../domain/helpers/uiHelper";

export const BlocksTable = (): ReactElement => {
    const {myCoin, storeBlockTransactions} = useContext(AppContext);

    const handleBlockClick = (block: Block) => () => {
        storeBlockTransactions(block.transactions);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650, maxWidth: '100%'}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Hash</TableCell>
                        <TableCell>Previous hash</TableCell>
                        <TableCell>Timestamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {myCoin?.chain.map((block: Block, i) => (
                        <TableRow key={block.timestamp} style={{cursor: 'pointer'}} onClick={handleBlockClick(block)}>
                            <TableCell style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                {i}
                            </TableCell>
                            <TableCell
                                style={{maxWidth: 150}}
                                sx={uiHelper.getColorByHash(block.hash)}
                                className={'text-croped'}
                            >
                                {block.hash}
                            </TableCell>
                            <TableCell
                                style={{maxWidth: 150}}
                                sx={uiHelper.getColorByHash(block.previousHash)}
                                className={'text-croped'}
                            >
                                {"0" === block.previousHash ? 'I am the genesis block' : block.previousHash}
                            </TableCell>
                            <TableCell style={{maxWidth: 150}} className={'text-croped'}>
                                {block.timestamp}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
