import React, {ReactElement, useContext, useEffect, useRef, useState} from "react";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {AppContext} from "../components/AppContext";
import {Section} from "../components/Section";
import {Transaction} from "../../domain/model/Transaction";
import {recreateChain} from "../../domain/hooks/useBlockchain";
import {getKeyFromPrivate} from "../../domain/helpers/keygenerator";

type TransactionFormValues = {to: string, amount: number};

export const TransactionCreator = (): ReactElement => {
    const {myCoin, setBlockchain, user, userWalletValue} = useContext(AppContext);
    const [transactionFormValues, setTransactionFormValues] = useState<TransactionFormValues>({to: '', amount: 0});
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(event: any) {
        setTransactionFormValues(prevState => ({...prevState, [event.target.name]: event.target.value}))
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        if (null === user || 0 === transactionFormValues.amount) {
            return;
        }
        const Key = getKeyFromPrivate(user.privateKey);
        const tx1 = new Transaction(Key.getPublic('hex'), transactionFormValues.to, transactionFormValues.amount);
        tx1.signTransaction(Key);
        myCoin?.addTransaction(tx1);
        if (inputRef?.current) {
            inputRef.current.value = "";
        }
        setBlockchain(recreateChain(myCoin));
    }

    useEffect(() => {
        setTransactionFormValues({to: '', amount: 0})
    }, [myCoin]);

    if (null === user || 0 === userWalletValue) {
        return <></>;
    }

    return (
        <Section
            title={'Create transaction'}
            subtitle={'Transfer some token to someone !'}
        >
            <form onSubmit={handleSubmit}>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                    <TextField
                        name={'from'}
                        label={'From address'}
                        defaultValue={user.publicKey}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        name={'to'}
                        label={'To address'}
                        value={transactionFormValues.to}
                        onChange={handleChange}
                    />
                    <TextField
                        inputRef={inputRef}
                        name={'amount'}
                        label={'Amount'}
                        type={'number'}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img src={myCoin?.icon} alt={'token'} height={20} width={20}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box mt={3}>
                    <Button variant={'contained'} type={'submit'} color={'secondary'}>
                        Sign & create transaction
                    </Button>
                </Box>
            </form>
        </Section>
    );
}
