import React, {ReactElement, useContext} from "react";
import {Box, Typography} from "@mui/material";
import {AppContext} from "./AppContext";

export const Header = (): ReactElement => {
    const {myCoin} = useContext(AppContext);

    return (
        <Box display={'flex'} component={'header'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'primary.main'} px={3} sx={{height: 72}}>
            <Box display={'flex'} alignItems={'center'} gap={2}>
                <picture>
                    <img src={myCoin?.icon} alt={"logo"} height={48} width={48} className={'spin'}/>
                </picture>
                <Typography variant={'h1'} color={"white"} data-testid={'appTitle'}>
                    My coin
                </Typography>
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={1}>
                <Typography variant={'h6'} color={"white"} data-testid={'appTitle'}>
                    Total chain value : {myCoin?.chainValue}
                </Typography>
                <img src={myCoin?.icon} alt={'token'} height={20} width={20}/>
            </Box>
        </Box>
    );
}
