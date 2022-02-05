import React, {ReactElement} from "react";
import {Theme} from "../style/Theme";
import {Header} from "./Header";
import {AppProvider} from "./AppContext";

export const Layout = ({children}: {children: ReactElement}): ReactElement => {
    return (
        <Theme>
            <Header/>
            <AppProvider>
                {children}
            </AppProvider>
        </Theme>
    );
};
