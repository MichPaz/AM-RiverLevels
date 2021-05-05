import React from 'react';
import {Grid} from '@material-ui/core'
import {Skeleton} from '@material-ui/lab'

export default function LoadingTree() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Skeleton variant="rect" height={24} width="60%" />
            </Grid>
            <Grid item xs={12}>
                <Skeleton variant="rect" height={24} width="40%" />
            </Grid>
            <Grid item xs={12}>
                <Skeleton variant="rect" height={24} width="30%" />
            </Grid>
            <Grid item xs={12}>
                <Skeleton variant="rect" height={24} width="70%" />
            </Grid>
            <Grid item xs={12}>
                <Skeleton variant="rect" height={24} width="50%" />
            </Grid>
        </Grid>
    )
}