import React, {useContext} from "react";
import {AppContext} from "./AppContext";
import {Grid, Typography} from "@mui/material";
import {BlockCard} from "./BlockCard";
import {Flexbox} from "./FlexBox";

export const BlocksList = () => {
    const {myCoin} = useContext(AppContext);

    return (
        <section>
            <Flexbox component={'header'} flexDirection={'column'} alignItems={'flex-start'} mt={2}>
                <Typography variant={'h1'}>
                    Blocks on chain
                </Typography>
                <Typography>
                    Each card represent a block on the chain. Click on a block to see the transactions stored inside.
                </Typography>
            </Flexbox>
            <Grid container spacing={3} mb={4} mt={2} component={'ul'}>
                {myCoin.chain.map((block, i) => (
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
