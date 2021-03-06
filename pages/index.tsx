import React from 'react';
import type { NextPage } from 'next';
import { useState, useEffect, MouseEvent } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { Toaster, toast } from 'react-hot-toast';
import classes from '../styles/Index.module.css';
import { ANSWERS, TOKEN } from '../apollo/queries';
import { validateUrl } from '../utils';
const Loading = React.lazy(() => import('../components/Loading'));
const Question = React.lazy(() => import('../components/Question'));
import type { QuestionProps } from '../components/Question/Question';
import Auth from '../auth/Auth';

const Home: NextPage = () => {
    const [answers, { loading, error }] = useLazyQuery(ANSWERS);
    const [token] = useLazyQuery(TOKEN);
    const [url, setUrl] = useState('');
    const [kahootAnswers, setKahootAnswers] = useState([]);
    const [goDisabled, setGoDisabled] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('input')) setUrl(localStorage.getItem('input') as string);

        const storedAnswers = JSON.parse(sessionStorage.getItem('answers') || '[]');
        if (storedAnswers.length) setKahootAnswers(storedAnswers);

        if (Auth.validateToken()) return;

        (async () => {
            const { data } = await token();

            if (!data?.token?.token) return toast.error('Failed to fetch API key! Please reload...');

            Auth.setToken(data.token.token);
        })();
    }, []);

    const handleInputChange = ({ target }: { target: HTMLTextAreaElement }) => {
        if (typeof target?.value !== 'string') return;

        setUrl(target?.value);
        localStorage.setItem('input', target.value);
    };

    const handleClick = async (e: MouseEvent) => {
        e.preventDefault();

        if (!validateUrl(url)) {
            return toast.error("Sorry! We can't take this URL");
        }

        if (!Auth.validateToken()) {
            toast.error('Token expired. Reloading now...');
            return window.location.reload();
        }

        try {
            const { data } = await answers({ variables: { url } });

            console.log(data);

            if (error || !data?.answers) {
                toast.error(`The request failed! ${error && error?.message}`);
                Auth.removeToken();
                return window.location.reload();
            }

            setKahootAnswers(data.answers);
            sessionStorage.setItem('answers', JSON.stringify(data.answers));

            toast.success('Successfully grabbed answers!');

            setGoDisabled(true);
            setTimeout(() => setGoDisabled(false), 5000);
        } catch (error) {
            toast.error('Request failed! Trying again!');
            Auth.removeToken();
            window.location.reload();
        }
    };

    const handleClear = () => {
        setUrl('');
        localStorage.setItem('input', '');
        setKahootAnswers([]);
        sessionStorage.setItem('answers', '[]');
    };

    return (
        <React.Suspense fallback={<p>Loading...</p>}>
            <Paper elevation={4} className={classes.wrapper}>
                <Typography variant={'h2'} component={'h2'}>
                    Kahoot Answers
                </Typography>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <TextField
                        label='Kahoot URL'
                        variant='filled'
                        className={classes.text}
                        onChange={(e) => handleInputChange(e as any)}
                        value={url}
                    />
                    <Button variant={'contained'} color={'error'} onClick={() => handleClear()}>
                        Clear
                    </Button>
                </Box>
                <Button variant={'contained'} type={'submit'} onClick={(e) => handleClick(e)} disabled={goDisabled}>
                    Go
                </Button>
                <Toaster position='top-center' reverseOrder={false} toastOptions={{ duration: 3000 }} />
                {loading && <Loading />}
            </Paper>
            <Box component={'div'} className={classes.box}>
                {kahootAnswers.map(({ title, choices }: QuestionProps, i) => {
                    return <Question title={title} choices={choices} index={i} key={i} />;
                })}
            </Box>
        </React.Suspense>
    );
};

export default Home;
