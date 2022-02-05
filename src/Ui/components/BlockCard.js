import {Card, CardContent, CardHeader, Typography} from "@mui/material";
import {uiHelper} from "../../Domain/helpers/uiHelper";
import {useContext} from "react";
import {AppContext} from "./AppContext";

const Line = ({title, value, ...otherProps}) => {
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

export const BlockCard = ({block, i}) => {
    const {blockTransactions, storeBlockTransactions} = useContext(AppContext);

    const handleBlockClick = (block) => () => {
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
                    sx={uiHelper.getColorByHash(block.hash)}
                    className={"text-croped"}
                />
                <hr/>
                <Line
                    title={'Previous Hash'}
                    value={"0" === block.previousHash ? 'I am the genesis block' : block.previousHash}
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
