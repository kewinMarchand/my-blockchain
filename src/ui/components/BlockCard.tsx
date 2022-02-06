import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import {uiHelper} from "../../domain/helpers/uiHelper";
import {ReactElement, useContext} from "react";
import {AppContext} from "./AppContext";
import {Block} from "../../domain/model/Block";
import React from "react";

const Line = ({title, value, ...otherProps}: {title: string, value: string|number, otherProps?: any}): ReactElement => {
    return (
        <>
            <Typography variant={'h6'}>
                {title}
            </Typography>
            <Typography variant={'body2'} {...otherProps}>
                {value}
            </Typography>
        </>
    )
}

export const BlockCard = ({block, i}: {block: Block, i: number}): ReactElement => {
    const {blockTransactions, storeBlockTransactions} = useContext(AppContext);

    const handleBlockClick = (block: Block) => () => {
        storeBlockTransactions(block.transactions);
    }

    return (
        <Card
            square
            elevation={3}
            onClick={handleBlockClick(block)}
            sx={{border: `${null !== blockTransactions && blockTransactions === block.transactions ? '1px solid blue' : '1px solid transparent'}`, cursor: 'pointer'}}
        >
            <CardHeader title={`Block ${i}`} sx={{boxShadow: '0 1px 1px 1px #00000030'}} />
            <CardContent>
                <Line
                    title={'Hash'}
                    value={block.hash}
                    // @ts-ignore
                    sx={uiHelper.getColorByHash(block.hash)}
                    className={"text-croped"}
                />
                <hr/>
                <Line
                    title={'Previous Hash'}
                    value={"0" === block.previousHash ? 'I am the genesis block' : block.previousHash}
                    // @ts-ignore
                    sx={uiHelper.getColorByHash(block.previousHash)}
                    className={"text-croped"}
                />
                <hr/>
                <Line
                    title={'Timestamp'}
                    value={block.timestamp}
                />
            </CardContent>
        </Card>
    )
}
