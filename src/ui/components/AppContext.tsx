import React, {createContext, ReactElement, useState} from "react";
import {useBlockchain} from "../../domain/hooks/useBlockchain";
import {Box, Typography} from "@mui/material";
import {Transaction} from "../../domain/model/Transaction";
import {getKeyPair} from "../../domain/helpers/keygenerator";
import {Blockchain} from "../../domain/model/Blockchain";

type AppContextProps = { myCoin: Blockchain|null, setBlockchain: any, blockTransactions: any, storeBlockTransactions: any, key: any };
export const AppContext = createContext<AppContextProps>(
    { myCoin: null, setBlockchain: null, blockTransactions: null, storeBlockTransactions: null, key: null }
);

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
