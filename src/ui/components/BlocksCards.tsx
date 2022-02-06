import React, {ReactElement, useContext} from "react";
import {AppContext} from "./AppContext";
import {Grid} from "@mui/material";
import {BlockCard} from "./BlockCard";
import {Block} from "../../domain/model/Block";

export const BlocksCards = (): ReactElement => {
    const {myCoin} = useContext(AppContext);

    return (
        <Grid container spacing={3} component={'ul'}>
            {myCoin?.chain.map((block: Block, i: number) => (
                <Grid item xs={12} sm={6} lg={4} key={block.hash} component={'li'}>
                    <BlockCard
                        block={block}
                        i={i}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
