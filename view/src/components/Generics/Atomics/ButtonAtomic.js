import React from 'react';
import './style/ButtonAtomic.css';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


function ButtonAtomic(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained"  onClick={props.evento} className="ButtonAtomic" {...props}>
                {props.name}
            </Button>
        </div>
    )

}

export default ButtonAtomic;