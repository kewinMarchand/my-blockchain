import React, {ReactElement} from "react";
import {Container} from "@mui/material";
import {Layout} from "./ui/components/Layout";
import {BlocksList} from "./ui/components/BlocksList";
import {TransactionsDialog} from "./ui/components/TransactionsDialog";
import {TransactionCreator} from "./ui/components/TransactionCreator";

function App(): ReactElement {
    return (
        <Layout>
            <Container component={'main'}>
                <BlocksList />
                <TransactionsDialog />
                <hr/>
                <TransactionCreator/>
                <hr/>
            </Container>
        </Layout>
    );
}

export default App;
