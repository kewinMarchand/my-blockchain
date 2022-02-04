import React, {createContext} from "react";
import {useBlockchain} from "../../Domain/hooks/useBlockchain";
import {Typography} from "@mui/material";
import {Flexbox} from "./FlexBox";

export const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const [myCoin,] = useBlockchain();

    if (null === myCoin) {
        return (
            <Flexbox>
                <Typography>No Data</Typography>
            </Flexbox>
        );
    }

    return (
        <AppContext.Provider value={{myCoin: myCoin}}>
            {children}
        </AppContext.Provider>
    )
};
