import { Box, Typography, Tooltip } from '@mui/material';

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
        <Tooltip title={choice?.correct ? 'Correct Answer' : 'Incorrect Answer'} placement={'top'} arrow>
            <Box className={`${classes.choice} ${choice.correct ? classes.correct : classes.wrong}`}>
                <Typography>{shortenAndTrim(choice?.answer)}</Typography>
            </Box>
        </Tooltip>
    );
}
