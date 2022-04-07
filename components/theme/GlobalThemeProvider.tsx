import { ThemeProvider, CssBaseline } from '@mui/material';

import theme from './theme';

import React, { ComponentProps } from 'react';

export default function GlobalThemeProvider({ children }: ComponentProps<any>) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children && children}
        </ThemeProvider>
    );
}
