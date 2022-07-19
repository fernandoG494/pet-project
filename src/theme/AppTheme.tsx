import React, { ReactNode } from 'react';
import { ThemeProvider } from '@emotion/react';
import CssBaseLine from '@mui/material/CssBaseline';
import { red } from '@mui/material/colors';
import { createTheme } from "@mui/material";

interface Props {
    children?: ReactNode;
}

const AppTheme = ({ children }: Props) => {

    const purpleTheme = createTheme({
        palette: {
            primary: {
                main: '#262254',
            },
            secondary: {
                main: '#543884',
            },
            error: {
                main: red.A400,
            }
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        }
    });

    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseLine />
            {children}
        </ThemeProvider>
    )
}

export default AppTheme;