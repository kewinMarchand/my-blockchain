import React, {ReactElement} from "react";
import {Box, Typography} from "@mui/material";

export const Section = ({title, subtitle, children}: {title: string, subtitle: string, children: ReactElement|ReactElement[]}): ReactElement => {
    return (
        <section>
            <Box display={'flex'} component={'header'} flexDirection={'column'} alignItems={'flex-start'} mt={4}>
                <Typography variant={'h1'}>
                    {title}
                </Typography>
                <Typography>
                    {subtitle}
                </Typography>
            </Box>
            <Box mb={6} mt={2}>
                {children}
            </Box>
            <hr/>
        </section>
    );
}
