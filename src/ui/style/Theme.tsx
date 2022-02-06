import React, {ReactElement} from "react";
import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline, GlobalStyles} from "@mui/material";
import { createTheme } from '@mui/material/styles';

const globalStylesOverride = {
    html: {
        fontSize: 10
    },
    '#app': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    main: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    picture: {
        display: 'flex',
        overflow: 'hidden'
    },
    ul: {
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    hr: {
        borderBottom: 0,
        color: 'lightgrey',
        margin: '16px 0'
    },
    '.text-croped': {
        whiteSpace: 'pre',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    '.spin': {
        animation: 'spin infinite 20s linear'
    },
    '@keyframes spin': {
        'from': {transform: 'rotateY(0deg)'},
        'to': {transform: 'rotateY(360deg)'}
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#282c34',
        },
        secondary: {
            main: '#BADA55',
        },
    },
    typography: {
        h1: {
            fontSize: '4.5rem',
        },
        h2: {
            fontSize: '4rem',
        },
        h3: {
            fontSize: '3.5rem',
        },
        h4: {
            fontSize: '3rem',
        },
        h5: {
            fontSize: '2.5rem',
        },
        h6: {
            fontSize: '2rem',
        },
        body1: {
            fontSize: '1.6rem',
        },
        body2: {
            fontSize: '1.4rem',
        }
    },
});

export const Theme = ({children}: {children: ReactElement|ReactElement[]}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/*// @ts-ignore*/}
            <GlobalStyles styles={globalStylesOverride} />
            {children}
        </ThemeProvider>
    );
}
