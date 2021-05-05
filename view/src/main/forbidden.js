import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Container, Grid, Typography } from '@material-ui/core';
import Img from '../images/ic_erro_403.svg';
// import { routeApiFront, methodApiToFront } from '../routes/translate'
import acions from '../actions/servicos'
import stores from '../stores/servicos'

function Forbidden() {

    const [servicos, setServicos] = useState([])

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    useEffect(() => {
        const oldStyle = document.body.style
        document.body.style['background-color'] = 'blue'
        document.body.style['background-image'] = 'linear-gradient(to right, #026292, #016A9C, #0173A6, #007EB3)'
        return () => {
            document.body.style = oldStyle
        }
    }, [])

    useEffect(() => {
        function onChange() {
            setServicos(stores.getList())
        }
        stores.addChangeListener(onChange)
        acions.list()
        return () => {
            stores.removeChangeListener(onChange)
        }
    }, [])

    let metodo = useQuery().get('metodo')
    let recurso = useQuery().get('recurso')

    const recursoLabel = servicos.find(e => e.rota === recurso && e.metodo === metodo)?.nome

    return (
        <div>
            <Container>
                <Grid item xs={12} style={{ height: '80px' }}></Grid>
                <Grid container justify='center'>
                    <img style={{ width: '180px' }} alt="logo_siflex" src={Img} />
                </Grid>
                <Grid style={{ height: '20px' }}></Grid>
                <Grid container justify='center'>
                    <Grid item xs={12} style={{ marginBottom: 20 }}>
                        <Typography variant='h5' align='center' style={{ color: '#fff' }}>Acesso Negado</Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>
                        <Typography variant='body1' align='center' style={{ marginBottom: 20, color: '#fff' }} >
                            Você tentou acessar uma funcionalidade na qual seu grupo de usuário não possui permissão.
                            Por gentileza faça login novamente para atualizar suas opções disponíveis.
                        </Typography>
                        <Typography variant='body2' align='center' style={{ color: '#fff' }}>
                            Entre em contato com o administrador de Grupo de Usuários para mais informações.
                        </Typography>
                        {recursoLabel && <Typography variant='body2' align='center' style={{ color: '#fff' }}>
                            <br />
                            Recurso Negado: <strong>{recursoLabel}</strong>.
                        </Typography>}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Forbidden