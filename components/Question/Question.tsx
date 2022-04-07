import { Paper, Typography, Box } from '@mui/material';

import { shortenAndTrim } from '../../utils';

import Choice from './Choice';
import classes from './Question.module.css';

export interface QuestionProps {
    index: number;
    title: string;
    choices: { answer: string; correct: boolean }[];
}

export default function Question({ index, title, choices }: QuestionProps) {
    return (
        <Paper className={classes.wrapper}>
            <Box className={classes.topBox}>
                <Typography variant={'subtitle1'} component={'p'} align={'center'}>
                    {shortenAndTrim(title)}
                </Typography>
            </Box>
            <Box className={classes.choiceBox}>
                {choices.map((choice) => {
                    return <Choice choice={choice} key={choice?.answer} />;
                })}
            </Box>
        </Paper>
    );
}