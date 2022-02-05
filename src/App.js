import React from "react";
import {Container} from "@mui/material";
import {BlocksList} from "./Ui/components/BlocksList";
import {Layout} from "./Ui/components/Layout";
import {TransactionsList} from "./Ui/components/TransactionsList";

function App() {
    return (
        <Layout>
            <Container component={'main'}>
                <BlocksList />
                <TransactionsList />
            </Container>
        </Layout>
    );
}

export default App;
