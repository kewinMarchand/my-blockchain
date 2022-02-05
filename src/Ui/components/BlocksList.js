import React, {useContext, useState} from "react";
import {AppContext} from "./AppContext";
import {Grid, Typography} from "@mui/material";
import {BlockCard} from "./BlockCard";
import {Flexbox} from "./FlexBox";

export const BlocksList = () => {
    const {myCoin} = useContext(AppContext);
    const [selectedBlock, setSelectedBlock] = useState(null);

    return (
        <section>
            <Flexbox component={'header'} flexDirection={'column'} alignItems={'flex-start'} mt={2}>
                <Typography variant={'h1'}>
                    Blocks on chain
                </Typography>
                <Typography>
                    Each card represent a block on the chain.
                </Typography>
            </Flexbox>
            <Grid container spacing={3} mb={4} mt={2} component={'ul'}>
                {myCoin.chain.map((block, i) => (
                    <Grid item xs={12} sm={6} lg={4} key={block.hash} component={'li'}>
                        <BlockCard
                            block={block}
                            selectedBlock={selectedBlock}
                            setSelectedBlock={setSelectedBlock}
                            i={i}
                        />
                    </Grid>
                ))}
            </Grid>
        </section>
    );
}
