import React, {ReactElement, useContext, useState} from "react";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {AppContext} from "../components/AppContext";
import {Section} from "../components/Section";
import {Transaction} from "../../domain/model/Transaction";
import {recreateChain} from "../../domain/hooks/useBlockchain";

type TransactionFormValues = {to: string, amount: number};

export const TransactionCreator = (): ReactElement => {
    const {myCoin, setBlockchain, key} = useContext(AppContext);
    const [transactionFormValues, setTransactionFormValues] = useState<TransactionFormValues>({to: '', amount: 0});

    function handleBlur(event: any) {
        setTransactionFormValues(prevState => ({...prevState, [event.target.name]: event.target.value}))
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const tx1 = new Transaction(key.getPublic('hex'), transactionFormValues.to, transactionFormValues.amount);
        tx1.signTransaction(key);
        myCoin?.addTransaction(tx1);
        setBlockchain(recreateChain(myCoin));
    }

    if (!key) {
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
                        defaultValue={key.getPublic('hex')}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        name={'to'}
                        label={'To address'}
                        defaultValue={''}
                        onBlur={handleBlur}
                    />
                    <TextField
                        name={'amount'}
                        label={'Amount'}
                        type={'number'}
                        defaultValue={null}
                        onBlur={handleBlur}
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
