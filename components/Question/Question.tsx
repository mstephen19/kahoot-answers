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
        <Paper elevation={4} className={classes.wrapper}>
            <Box className={classes.topBox}>
                <Paper elevation={8} className={classes.questionNumber}>
                    <Typography variant={'h6'} component={'p'}>
                        Q.{index + 1}
                    </Typography>
                </Paper>
                <Typography variant={'subtitle1'} component={'p'} align={'center'} className={classes.questionText}>
                    {shortenAndTrim(title)}
                </Typography>
            </Box>
            <Box className={classes.choiceBox}>
                {choices?.length && choices.map((choice) => {
                    return <Choice choice={choice} key={choice?.answer} />;
                })}
            </Box>
        </Paper>
    );
}
