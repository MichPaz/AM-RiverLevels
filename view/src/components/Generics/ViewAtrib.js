import React from 'react'
import { Typography, Grid } from '@material-ui/core'

export default function ViewAtrib(props) {
    return (
        <Grid item xs={12} md={props.md || 6}>
            <Typography variant='body2' color='textSecondary' align='left'>
                {props.label}
            </Typography>
            <Typography variant='body1' align='left' style={{ marginLeft: 20 }}>
                {props.value ? props.value : 'Não informado!'}
            </Typography>

            <br />
        </Grid>
    )
}