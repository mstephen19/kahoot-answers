import { Container, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Head from 'next/head';
import { ComponentProps } from 'react';

import classes from './Layout.module.css';

export default function Layout({ children }: ComponentProps<any>) {
    return (
        <>
            <Head>
                <title>Kahoot! Answers</title>
                <meta name='description' content='Get the correct answers for any Kahoot quiz.' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <a href='https://github.com/mstephen19/kahoot-answers' target='_blank' rel='noreferrer' className={classes.icon}>
                <GitHubIcon className={classes.github} />
            </a>

            <Container maxWidth='xl' sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                {children && children}
            </Container>
        </>
    );
}
