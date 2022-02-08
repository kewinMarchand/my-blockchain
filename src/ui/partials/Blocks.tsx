import React, {ReactElement, useState} from "react";
import {Section} from "../components/Section";
import {TransactionsDialog} from "../components/TransactionsDialog";
import {BlocksTable} from "../components/BlocksTable";
import {BlocksCards} from "../components/BlocksCards";
import {Box, Stack, Switch, Typography} from "@mui/material";

export const Blocks = (): ReactElement => {
    const [showingCards, setShowingCards] = useState(false)

    function handleSwitch() {
        setShowingCards(v => !v);
    }

    return (
        <Section
            title={'Blocks on chain'}
            subtitle={`Each ${showingCards ? 'card' : 'line'} represent a block on the chain. Click on a block to see the transactions stored inside.`}
        >
            {showingCards ?
                <BlocksCards/>
                :
                <BlocksTable/>
            }
            <Box mt={3}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>Vue liste</Typography>
                    <Switch color={'secondary'} checked={showingCards} onChange={handleSwitch} />
                    <Typography>Vue carte</Typography>
                </Stack>
            </Box>
            <TransactionsDialog />
        </Section>
    );
}
