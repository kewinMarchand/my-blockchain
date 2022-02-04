import React, {useContext} from "react";
import {AppContext} from "./AppContext";
import {Grid} from "@mui/material";
import {BlockCard} from "./BlockCard";

export const BlocksList = () => {
    const {myCoin} = useContext(AppContext);

    return (
        <Grid container spacing={3} mt={2} component={'ul'}>
            {myCoin.chain.map((block, i) => (
                <Grid item xs={12} sm={6} lg={4} key={block.hash} component={'li'}>
                    <BlockCard block={block} i={i}/>
                </Grid>
            ))}
        </Grid>
    );
}
