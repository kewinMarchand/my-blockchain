import React, {createContext, ReactElement, useEffect, useState} from "react";
import {recreateChain, useBlockchain} from "../../domain/hooks/useBlockchain";
import {Box, Typography} from "@mui/material";
import {Transaction} from "../../domain/model/Transaction";
import {Blockchain} from "../../domain/model/Blockchain";

type AppContextProps = {
    myCoin: Blockchain|null,
    setBlockchain: any,
    blockTransactions: any,
    storeBlockTransactions: any,
    user: User|null,
    userWalletValue: number,
    setUser: any
};

export const AppContext = createContext<AppContextProps>(
    {
        myCoin: null,
        setBlockchain: null,
        blockTransactions: null,
        storeBlockTransactions: null,
        user: null,
        userWalletValue: 0,
        setUser: null
    }
);

export type User = {
    pseudo: string,
    publicKey: string,
    privateKey: string,
}

export const AppProvider = ({children}: {children: ReactElement|ReactElement[]}): ReactElement => {
    const [myCoin, setBlockchain] = useBlockchain();
    const [user, setUser] = useState<User|null>(null);
    const [blockTransactions, setBlockTransactions] = useState<Transaction[]|null>(null);
    const [userWalletValue, setUserWalletValue] = useState<number>(0);

    function offerRewardForSignin() {
        if (null === myCoin || null === user || null === user.publicKey) {
            return;
        }

        const signinReward = myCoin.miningReward;
        const rewardTx = new Transaction(null, user.publicKey, signinReward);
        myCoin.pendingTransactions.push(rewardTx);
        myCoin.chainValue += signinReward;

        setBlockchain(recreateChain(myCoin));
    }

    function storeUser() {
        if (null === user) {
            return;
        }
        localStorage.setItem('user', JSON.stringify(user));
        offerRewardForSignin()
    }

    useEffect(storeUser, [user]);

    function storeUserWalletValue() {
        if (null === myCoin || null === user || null === user.publicKey) {
            return;
        }
        setUserWalletValue(myCoin.getBalanceOfAddress(user.publicKey))

    }

    useEffect(storeUserWalletValue, [myCoin, user]);

    function retrieveUser() {
        const userFromStorage = localStorage.getItem('user');
        if (null !== userFromStorage) {
            setUser(() => ({...JSON.parse(userFromStorage)}))
        }
    }

    useEffect(retrieveUser, []);

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
                user: user,
                userWalletValue: userWalletValue,
                setUser: setUser
            }}
        >
            {children}
        </AppContext.Provider>
    )
};
