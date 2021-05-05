import React from 'react';
import { Grid, Hidden } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import LoadingList from './loadingList'

export default function LoadingTable(props) {

    const count = props.count ? props.count : 10

    return (<>
        <Hidden smDown>
            <Grid item xs={12}>
                {[...Array(count).keys()].map((item) => (
                    <Grid container spacing={1} key={item}>
                        <Grid item xs={3} >
                            <Skeleton variant="rect" height={48} />
                        </Grid>
                        <Grid item xs={3} >
                            <Skeleton variant="rect" height={48} />
                        </Grid>
                        <Grid item xs={3} >
                            <Skeleton variant="rect" height={48} />
                        </Grid>
                        <Grid item xs={3} >
                            <Skeleton variant="rect" height={48} />
                        </Grid>
                        <Grid item xs={12} style={{ height: '2px' }}>
                        </Grid>

                    </Grid>
                ))}
            </Grid>
        </Hidden>

        <Hidden mdUp>
            <LoadingList count={count} />
        </Hidden>

    </>
    )
}