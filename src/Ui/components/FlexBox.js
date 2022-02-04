import React from "react";
import {Box} from "@mui/material";

export const Flexbox = ({children, ...otherProps}) => {
    return (
        <Box
            display={'flex'}
            justifyContent={otherProps.justifyContent ?? 'center'}
            alignItems={otherProps.alignItems ?? 'center'}
            gap={otherProps.gap ?? 2}
            {...otherProps}
        >
            {children}
        </Box>
    );
}
