import React from 'react';
import { Grid, Container } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const max = 95
const min = 30

export default function LoadingObject(props) {

    const count = props.count ? props.count : 10

    return (
        <Grid container>
            <Container>
                <Grid container spacing={3}>
                    {[...Array(count).keys()].map((item) => {
                        const n = Math.random() * (max - min) + min
                        return (<Grid item xs={6} key={item}>
                            <Skeleton variant="rect" height={24} width={`${n}%`} />
                        </Grid>)
                    }
                    )}
                </Grid>
            </Container>
        </Grid>
    )
}