import React from "react";
import logo from '../assets/logo.svg';
import {Typography} from "@mui/material";
import {Flexbox} from "./FlexBox";

export const Header = () => {
    return (
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
