import React, {createContext, ReactElement, useState} from "react";
import {useBlockchain} from "../../domain/hooks/useBlockchain";
import {Box, Typography} from "@mui/material";
import {Transaction} from "../../domain/model/Transaction";
import {getKeyPair} from "../../domain/helpers/keygenerator";

export const AppContext = createContext(null);

export const AppProvider = ({children}: {children: ReactElement|ReactElement[]}): ReactElement => {
    const [myCoin, setBlockchain] = useBlockchain();
    const [blockTransactions, setBlockTransactions] = useState<Transaction[]|null>(null);
    const [key,] = useState<any>(getKeyPair());

    function storeBlockTransactions(transactions: Transaction[]|null) {
        setBlockTransactions(transactions);
    }

    if (null === myCoin) {
        return (
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Typography>No Data</Typography>
            </Box>
        );
    }

    return (
        <AppContext.Provider
            value={{
                myCoin: myCoin,
                setBlockchain: setBlockchain,
                blockTransactions: blockTransactions,
                storeBlockTransactions: storeBlockTransactions,
                key: key
            }}
        >
            {children}
        </AppContext.Provider>
    )
};
