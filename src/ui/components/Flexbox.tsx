import React, {ReactElement} from "react";
import {Box} from "@mui/material";

export const Flexbox = ({children, ...otherProps}: {children: ReactElement|ReactElement[], otherProps?: unknown}): ReactElement => {
    return (
        <Box
            display={'flex'}
            // @ts-ignore
            justifyContent={otherProps.justifyContent ?? 'center'}
            // @ts-ignore
            alignItems={otherProps.alignItems ?? 'center'}
            // @ts-ignore
            gap={otherProps.gap ?? 2}
            {...otherProps}
        >
            {children}
        </Box>
    );
}
