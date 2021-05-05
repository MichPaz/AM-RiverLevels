import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Container, Grid } from '@material-ui/core'
import Img from '../images/marca.svg'
import './style/loader.css'


function LoadingPage() {

    return (
        <div>
            <Container>
                <Grid item xs={12} style={{ height: '80px' }}></Grid>
                <Grid container justify='center'>
                    <img style={{ width: '180px' }} alt="logo_siflex" src={Img} />
                </Grid>
                <Grid style={{ height: 30 }}></Grid>
                <Grid container justify='center'>
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </Grid>
            </Container>
        </div>
    );
}

export default LoadingPage