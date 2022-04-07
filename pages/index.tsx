import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { Toaster, toast } from 'react-hot-toast';
import classes from '../styles/Index.module.css';
import { ANSWERS, TOKEN } from '../apollo/queries';
import { validateUrl } from '../utils';
import Loading from '../components/Loading';
import Question from '../components/Question';
import { QuestionProps } from '../components/Question/Question';
import Auth from '../auth/Auth';

const Home: NextPage = () => {
    const [answers, { loading, error }] = useLazyQuery(ANSWERS);
    const [token] = useLazyQuery(TOKEN);
    const [url, setUrl] = useState('');
    const [kahootAnswers, setKahootAnswers] = useState([]);

    useEffect(() => {
        if (Auth.validateToken()) return;

        (async () => {
            const { data } = await token();

            console.log(data.token.token);

            Auth.setToken(data.token.token);
        })();
    }, []);

    const handleInputChange = ({ target }: { target: HTMLTextAreaElement }) => {
        if (!target?.value) return;

        setUrl(target.value);
    };

    const handleClick = async () => {
        if (!validateUrl(url)) {
            return toast.error("Sorry! We can't take this URL");
        }

        if (!Auth.validateToken()) {
            return toast.error('Token expired. Please reload.');
        }

        const { data } = (await answers({ variables: { url } })) || {};

        if (error || !data?.answers) return toast.error('The request failed!');

        setKahootAnswers(data.answers);

        toast.success('Successfully grabbed answers!');
    };

    return (
        <>
            <Paper elevation={4} className={classes.wrapper}>
                <Typography variant={'h2'} component={'h2'}>
                    Kahoot Answers
                </Typography>
                <TextField label='Kahoot URL' variant='filled' className={classes.text} onChange={(e) => handleInputChange(e as any)} />
                <Button variant={'contained'} type={'submit'} onClick={() => handleClick()}>
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
        </>
    );
};

export default Home;
