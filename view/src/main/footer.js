import React, { useEffect } from 'react'
import { Typography, Container, Grid } from '@material-ui/core'
// import governo from '../images/marca-gov-horizontal-invert.svg'

const styles = {
    position: 'absolute',
    clear: 'both',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#1B518A',
    color: 'white',
    textAlign: 'center',
    minHeight: 120,
}

function Footer() {

    useEffect(() => {
        function formatContentApp() {
            var el = document.getElementById('content-wrap')
            if (el)
                el.style.paddingBottom = `${document.getElementById('footer').offsetHeight + 20}px`
        }
        async function callFormat() {
            formatContentApp()
            await new Promise(resolve => setTimeout(resolve, 1e3));
            formatContentApp()
        }
        callFormat()
    }, []);

    return (
        <>
            <div id='footer' style={styles}>
                <Container>
                    <Grid container justify='space-between'>
                        <Grid item xs={12} style={{ height: 10 }} />
                        <Grid item xs={12} sm={6} lg={4}>
                            <Typography variant={'body1'} align='left' style={{ fontSize: '0.75rem', paddingBottom: 5 }}>
                                {`${window.config.nomeSistema}`}
                            </Typography>
                            <Typography variant={'body1'} align='left' style={{ fontSize: '0.75rem' }}>
                                {/* <br /> */}
                                Equipe de Desenvolvimento
                                <br />
                                {`E-mail: ${window.config.emailDev}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Grid container justify='flex-end'>
                                {/* <a href="http://www.amazonas.am.gov.br/">
                                    <img
                                        src={governo}
                                        alt="Governo do Estado do Amazonas"
                                        style={{ width: 180 }} />
                                </a> */}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'body1'} align='center' style={{ fontSize: '0.6rem', paddingTop: 5 }}>
                                {`Versão: ${window.config.version.slice(-1)[0]}`}
                                <br />
                            copyright © 2021
                        </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ height: 10 }} />
                    </Grid>
                </Container>
            </div>
        </>
    )
}

export default Footer