import { CircularProgress } from '@mui/material';

import classes from './Loading.module.css';

export default function Loading() {
    return (
        <div className={classes.blur}>
            <CircularProgress variant={'indeterminate'} size={100} thickness={5} />
        </div>
    );
}
