import React from 'react';
import { Grid,/* Container*/ } from '@material-ui/core'

import PageHeader from '../../components/Generics/PageHeader';

const dataHeader = {
    crumbs: [],
    title: 'Níveis de Rio',
    description: ''
}

function Home() {

    return (
        <PageHeader data={dataHeader}>

            <Grid item xs={12}>
                <Grid container spacing={3} justify='center'>
                    <Grid item xs={12} style={{ height: 20 }} />
                    {/* <Container>

                    </Container> */}

                </Grid>
            </Grid>

        </PageHeader>

    );
}

export default Home;