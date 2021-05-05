import React from 'react';
import { Container, Typography, Grid } from '@material-ui/core';

import BreadCrumb from './BreadCrumb';

function PageHeader(props) {

    let data = props.data

    return (
        <Container maxWidth='lg'>

            <Grid item style={{height: 20}} />

            <BreadCrumb crumbs={data.crumbs} />

            <Container>
                <Typography variant="h5" component="h5">
                    {data.title}
                </Typography>

                <Typography variant="body2" component="h6">
                    {data.description}
                </Typography>

                <Grid item style={{height: 20}} />

            </Container>

            {props.children}

            <Grid item style={{height: 50}} />

        </Container>
    )

}



export default PageHeader;