import React, {ReactElement, useContext} from "react";
import {AppContext} from "./AppContext";
import {Grid, Typography} from "@mui/material";
import {BlockCard} from "./BlockCard";
import {Flexbox} from "./Flexbox";
import {Block} from "../../domain/model/Block";

export const BlocksList = (): ReactElement => {
    const {myCoin} = useContext(AppContext);

    return (
        <section>
            {/*// @ts-ignore*/}
            <Flexbox component={'header'} flexDirection={'column'} alignItems={'flex-start'} mt={2}>
                <Typography variant={'h1'}>
                    Blocks on chain
                </Typography>
                <Typography>
                    Each card represent a block on the chain. Click on a block to see the transactions stored inside.
                </Typography>
            </Flexbox>
            <Grid container spacing={3} mb={4} mt={2} component={'ul'}>
                {myCoin.chain.map((block: Block, i: number) => (
                    <Grid item xs={12} sm={6} lg={4} key={block.hash} component={'li'}>
                        <BlockCard
                            block={block}
                            i={i}
                        />
                    </Grid>
                ))}
            </Grid>
        </section>
    );
}
