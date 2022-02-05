import React, {createContext, ReactElement, useState} from "react";
import {useBlockchain} from "../../domain/hooks/useBlockchain";
import {Typography} from "@mui/material";
import {Flexbox} from "./Flexbox";
import {Transaction} from "../../domain/model/Transaction";

export const AppContext = createContext(null);

export const AppProvider = ({children}: {children: ReactElement}): ReactElement => {
    const [myCoin,] = useBlockchain();
    const [blockTransactions, setBlockTransactions] = useState<Transaction[]|null>(null);

    function storeBlockTransactions(transactions: Transaction[]|null) {
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
