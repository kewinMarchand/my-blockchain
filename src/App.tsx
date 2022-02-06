import React, {ReactElement} from "react";
import {Container} from "@mui/material";
import {Layout} from "./ui/components/Layout";
import {Signin} from "./ui/partials/Signin";
import {Blocks} from "./ui/partials/Blocks";
import {TransactionCreator} from "./ui/partials/TransactionCreator";
import {Miner} from "./ui/partials/Miner";
import {Reset} from "./ui/components/Reset";

function App(): ReactElement {
    return (
        <Layout>
            <Container component={'main'}>
                <Signin/>
                <Blocks />
                <TransactionCreator/>
                <Miner/>
                <Reset/>
            </Container>
        </Layout>
    );
}

export default App;
