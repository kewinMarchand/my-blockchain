import React, {createContext, useState} from "react";
import {useBlockchain} from "../../Domain/hooks/useBlockchain";
import {Typography} from "@mui/material";
import {Flexbox} from "./FlexBox";

export const AppContext = createContext(null);

export const AppProvider = ({children}) => {
    const [myCoin,] = useBlockchain();
    const [blockTransactions, setBlockTransactions] = useState(null);

    /**
     *
     * @param transactions {any[]|null}
     */
    function storeBlockTransactions(transactions) {
        setBlockTransactions(transactions);
    }

    if (null === myCoin) {
        return (
            <Flexbox>
                <Typography>No Data</Typography>
            </Flexbox>
        );
    }

    return (
        <AppContext.Provider
            value={{
                myCoin: myCoin,
                blockTransactions: blockTransactions,
                storeBlockTransactions: storeBlockTransactions
            }}
        >
            {children}
        </AppContext.Provider>
    )
};
