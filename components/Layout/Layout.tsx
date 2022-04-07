import { Container } from '@mui/material';
import Head from 'next/head';
import { ComponentProps } from 'react';

export default function Layout({ children }: ComponentProps<any>) {
    return (
        <>
            <Head>
                <title>Kahoot! Answers</title>
                <meta name='description' content='Get the correct answers for any Kahoot quiz.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Container maxWidth='xl' sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                {children && children}
            </Container>
        </>
    );
}
