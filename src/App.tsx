import React, {ReactElement} from "react";
import {Container} from "@mui/material";
import {Layout} from "./ui/components/Layout";
import {BlocksList} from "./ui/components/BlocksList";
import {TransactionsDialog} from "./ui/components/TransactionsDialog";

function App(): ReactElement {
    return (
        <Layout>
            <Container component={'main'}>
                <BlocksList />
                <TransactionsDialog />
            </Container>
        </Layout>
    );
}

export default App;
