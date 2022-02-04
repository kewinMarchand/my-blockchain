import React from "react";
import {Container} from "@mui/material";
import {BlocksList} from "./Ui/components/BlocksList";
import {Layout} from "./Ui/components/Layout";

function App() {
    return (
        <Layout>
            <Container component={'main'}>
                <BlocksList />
            </Container>
        </Layout>
    );
}

export default App;
