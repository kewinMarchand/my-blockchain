import React, {ReactElement, useContext, useState} from "react";
import {AppContext} from "../components/AppContext";
import {Box, Button, InputAdornment, TextField} from "@mui/material";
import {Section} from "../components/Section";
import {getKeyPair} from "../../domain/helpers/keygenerator";

export const Signin = (): ReactElement => {
    const {myCoin, user, userWalletValue, setUser} = useContext(AppContext);
    const [pseudo, setPseudo] = useState('');

    function handleChange(event: any) {
        setPseudo(event.target.value);
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const keyPair = getKeyPair();
        setUser({pseudo: pseudo, privateKey: keyPair.getPrivate('hex'), publicKey: keyPair.getPublic('hex')});
    }

    return (
        <Section
            title={null === user ? 'Register' : `Welcome ${user.pseudo}`}
            subtitle={null === user ? 'Register & earn 100 tokens, registering creates tokens assigned to you' : 0 === userWalletValue ? 'You have generated 100 tokens by registering, you can mine a block to receive them and earn 100 more tokens for mining' : 'You can make transactions'}
        >
            <Box mt={3}>
                {null === user ?
                    <>
                        <form onSubmit={handleSubmit}>
                            <Box display={'flex'} flexDirection={'column'} gap={2}>
                                <TextField
                                    name={'pseudo'}
                                    label={'Pseudo'}
                                    defaultValue={pseudo}
                                    onChange={handleChange}
                                />
                                <Box mt={3}>
                                    <Button variant={'contained'} type={'submit'} color={'secondary'}>
                                        Sign in
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </>
                :
                    <Box display={'flex'} flexDirection={'column'} gap={2}>
                        <TextField
                            label={'Your public key / Your wallet address'}
                            defaultValue={user.publicKey}
                            InputProps={{
                                readOnly: true,
                                disabled: true
                            }}
                        />
                        <TextField
                            label={'Your private key - Confidentiel !'}
                            defaultValue={user.privateKey}
                            InputProps={{
                                readOnly: true,
                                disabled: true
                            }}
                        />
                        <TextField
                            label={'Your wallet value'}
                            value={userWalletValue}
                            InputProps={{
                                readOnly: true,
                                disabled: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <img src={myCoin?.icon} alt={'token'} height={20} width={20}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                }
            </Box>
        </Section>
    );
}
