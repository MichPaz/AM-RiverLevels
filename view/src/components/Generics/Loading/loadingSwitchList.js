import React from 'react';
import { Grid, Container, Switch, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const max = 60
const min = 30

export default function LoadingSwitchList(props) {

    const count = props.count ? props.count : 10

    return (
        <Grid container>
            <Container>
                <Grid container spacing={1}>
                    {[...Array(count).keys()].map((item) => {
                        const n = Math.random() * (max - min) + min
                        return (
                            <Grid item xs={12} key={item}>
                                <Grid container>
                                    <Skeleton style={{ marginRight: 7 }}>
                                        <Switch />
                                    </Skeleton>
                                    <Skeleton>
                                        <Typography variant='body1'>{'*'.repeat(n)}</Typography>
                                    </Skeleton>
                                </Grid>
                            </Grid>
                        )
                    }
                    )}
                </Grid>
            </Container>
        </Grid>
    )
}