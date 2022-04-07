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
                <meta name='description' content='Get the correct answers for any Kahoot quiz or challenge.' />
                <meta name='robots' content='noindex,nofollow' />
                <meta name='googlebot' content='notranslate' />
                <meta property='og:title' content='Kahoot! Answers' />
                <meta property='og:type' content='website' />
                <meta property='og:url' content='https://kahoot-answers.herokuapp.com/' />
                <meta property='og:description' content='Get the correct answers for any Kahoot quiz or challenge.' />
            </Head>

            <Container
                maxWidth='xl'
                sx={{
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '5px',
                }}
            >
                <a href='https://github.com/mstephen19/kahoot-answers' target='_blank' rel='noreferrer' className={classes.icon}>
                    <GitHubIcon className={classes.github} />
                </a>
                {children && children}
            </Container>
        </>
    );
}
