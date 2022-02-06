import React, {ReactElement, useContext} from "react";
import {Box, Typography} from "@mui/material";
import {AppContext} from "./AppContext";

export const Header = (): ReactElement => {
    const {myCoin} = useContext(AppContext);

    return (
        <Box display={'flex'} component={'header'} justifyContent={'center'} alignItems={'center'} bgcolor={'primary.main'} gap={2} sx={{height: 72}}>
            <picture>
                <img src={myCoin?.icon} alt={"logo"} height={48} width={48} className={'spin'}/>
            </picture>
            <Typography variant={'h1'} color={"white"} data-testid={'appTitle'}>
                My coin
            </Typography>
        </Box>
    );
}
