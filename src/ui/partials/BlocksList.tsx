import React, {ReactElement, useContext} from "react";
import {AppContext} from "../components/AppContext";
import {Grid} from "@mui/material";
import {BlockCard} from "../components/BlockCard";
import {Block} from "../../domain/model/Block";
import {Section} from "../components/Section";
import {TransactionsDialog} from "../components/TransactionsDialog";

export const BlocksList = (): ReactElement => {
    const {myCoin} = useContext(AppContext);

    return (
        <Section
            title={'Blocks on chain'}
            subtitle={'Each card represent a block on the chain. Click on a block to see the transactions stored inside.'}
        >
            <Grid container spacing={3} component={'ul'}>
                {myCoin.chain.map((block: Block, i: number) => (
                    <Grid item xs={12} sm={6} lg={4} key={block.hash} component={'li'}>
                        <BlockCard
                            block={block}
                            i={i}
                        />
                    </Grid>
                ))}
            </Grid>
            <TransactionsDialog />
        </Section>
    );
}
