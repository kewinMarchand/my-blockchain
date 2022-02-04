import React from "react";
import {Theme} from "../style/Theme";
import {Header} from "./Header";
import {AppProvider} from "./AppContext";

export const Layout = ({children}) => {
    return (
        <Theme>
            <Header/>
            <AppProvider>
                {children}
            </AppProvider>
        </Theme>
    );
};
