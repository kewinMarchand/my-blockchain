import React, {ReactElement} from "react";
import {Typography} from "@mui/material";
import {Flexbox} from "./Flexbox";
// @ts-ignore
import logo from '../assets/logo.svg';

export const Header = (): ReactElement => {
    return (
        // @ts-ignore
        <Flexbox component={'header'} bgcolor={'primary.main'} sx={{height: 80}}>
            <picture>
                <img src={logo} alt={"logo"} height={48} width={48} className={'spin'}/>
            </picture>
            <Typography variant={'h1'} color={"white"} data-testid={'appTitle'}>
                My coin
            </Typography>
        </Flexbox>
    );
}
