import React from "react";
import {Container} from "@mui/material";
import {Layout} from "./Ui/components/Layout";
import {BlocksList} from "./Ui/components/BlocksList";
import {TransactionsDialog} from "./Ui/components/TransactionsDialog";

function App() {
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
