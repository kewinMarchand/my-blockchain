import React, {ReactElement} from "react";
import {Container} from "@mui/material";
import {Layout} from "./ui/components/Layout";
import {Signin} from "./ui/partials/Signin";
import {BlocksList} from "./ui/partials/BlocksList";
import {TransactionCreator} from "./ui/partials/TransactionCreator";
import {Miner} from "./ui/partials/Miner";

function App(): ReactElement {
    return (
        <Layout>
            <Container component={'main'}>
                <Signin/>
                <BlocksList />
                <TransactionCreator/>
                <Miner/>
            </Container>
        </Layout>
    );
}

export default App;
