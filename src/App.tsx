import React, {ReactElement} from "react";
import {Container} from "@mui/material";
import {Layout} from "./ui/components/Layout";
import {BlocksList} from "./ui/partials/BlocksList";
import {TransactionCreator} from "./ui/partials/TransactionCreator";
import {Miner} from "./ui/partials/Miner";

function App(): ReactElement {
    return (
        <Layout>
            <Container component={'main'}>
                <BlocksList />
                <hr/>
                <TransactionCreator/>
                <hr/>
                <Miner/>
            </Container>
        </Layout>
    );
}

export default App;
