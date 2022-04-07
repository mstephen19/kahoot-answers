import { Box, Typography } from '@mui/material';

import { shortenAndTrim } from '../../utils';

import classes from './Question.module.css';

interface ChoiceProps {
    choice: {
        answer: string;
        correct: boolean;
    };
}

export default function Choice({ choice }: ChoiceProps) {
    return (
        <>
            {choice?.correct ? (
                <Box sx={{ background: 'limegreen' }} className={classes.choice}>
                    <Typography>{shortenAndTrim(choice?.answer)}</Typography>
                </Box>
            ) : (
                <Box sx={{ background: 'grey' }} className={classes.choice}>
                    <Typography>{shortenAndTrim(choice?.answer)}</Typography>
                </Box>
            )}
        </>
    );
}
