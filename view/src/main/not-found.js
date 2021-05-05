import React, { useEffect } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import Img from '../images/ic_erro_404.svg';


function NotFound() {
  useEffect(() => {
    const oldStyle = document.body.style
    document.body.style['background-color'] = 'blue'
    document.body.style['background-image'] = 'linear-gradient(to right, #026292, #016A9C, #0173A6, #007EB3)'
    return () => {
      document.body.style = oldStyle
    }
  }, [])
  return (
    <div>
      <Container>
        <Grid item xs={12} style={{ height: '80px' }}></Grid>
        <Grid container justify='center'>
          <Grid item xs={12} md={8}>
            <Grid container justify='center'>
              <img style={{ width: '90%' }} alt="logo_siflex" src={Img} />
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{ height: '20px' }}></Grid>
        <Grid container justify='center'>
          <Grid item xs={11} style={{ marginBottom: 10 }}>
            <Typography align='center' variant='h5' style={{ color: '#fff' }}>
              Ops! A página solicitada não foi encontrada.
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography align='center' variant='body1' style={{ color: '#fff' }}>
              Verifique a URL ou digite o que deseja encontrar na barra de pesquisa.
          </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default NotFound;
