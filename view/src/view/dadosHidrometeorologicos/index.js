import React, { useState, useEffect } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { format } from "date-fns";
import PageHeader from '../../components/Generics/PageHeader'
import {
    Paper, Button, Grid, Typography, Container,
    CircularProgress, Backdrop, FormControl, FormLabel,
    FormGroup, Checkbox, FormControlLabel, Slider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';

import actions from '../../actions/dadosHidrometereologico'
import stores from '../../stores/dadosHidrometereologico'
import model from '../../models/dadosHidrometeorologico'

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const keys = [
    { key: 'estacoes', md: 4 },
    { key: 'startDate', md: 4 },
    { key: 'endDate', md: 4 },
]

const dateFormatter = date => {
    return format(new Date(date), "dd/MM");
};

const CustomTooltip = props => {
    const { active, payload, lines } = props;
    if (active) {
        const currData = payload && payload.length ? payload[0].payload : null;
        return (
            <Paper>
                <Grid container spacing={3}>
                    <Container>
                        {lines['nivel'] && <Grid item xs>
                            <Typography variant='body1'>
                                {"Nível : "}<em>{currData ? currData.nivel : " -- "}</em>
                            </Typography>
                        </Grid>}
                        {lines['vazao'] && <Grid item xs>
                            <Typography variant='body1'>
                                {"Vazão : "}<em>{currData ? currData.vazao : " -- "}</em>
                            </Typography>
                        </Grid>}
                        {lines['chuva'] && <Grid item xs>
                            <Typography variant='body1'>
                                {"Chuva : "}<em>{currData ? currData.chuva : " -- "}</em>
                            </Typography>
                        </Grid>}
                        <Grid item xs>
                            <Typography variant='body1' color='textSecondary'>
                                {currData ? format(new Date(currData.dataHora), "dd/MM/yyyy hh:mm:ss") : " -- "}
                            </Typography>
                        </Grid>
                    </Container>
                </Grid>
            </Paper>
        );
    }

    return null;
};

const DadosHidrometeorologicos = () => {
    const classes = useStyles()
    const [list, setList] = useState({})
    const [loading, setLoading] = useState(false)

    const [heigthChart, setHeigthChart] = useState(400)
    const [lines, setLines] = useState({
        'nivel': true,
        'vazao': false,
        'chuva': false,
    })

    const [heigthChartF, setHeigthChartF] = useState(heigthChart)
    const [linesF, setLinesF] = useState(lines)
    const { nivel, vazao, chuva } = linesF

    const header = {
        crumbs: [{ label: 'Cotas', crumb: '#' }],
        title: 'Visualização de Cotas',
        description: ''
    }

    async function onSubmit(values) {
        await actions.list(values)
        setLoading(true)
    }

    function handleSubmitConfig() {
        setHeigthChart(heigthChartF)
        setLines(linesF)
    }

    const handleChangeCheckBox = (e) => {
        setLinesF({ ...linesF, [e.target.name]: e.target.checked });
    }

    useEffect(() => {
        const _onChange = () => {
            setList(stores.getList())
            setLoading(false)
        }

        function startValues() {
            stores.addChangeListener(_onChange);
        }

        startValues();

        return function cleanup() {
            stores.removeChangeListener(_onChange);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <PageHeader data={header}>

            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Paper>
                <Formik
                    validationSchema={model.getValidationQuery(keys)}
                    onSubmit={
                        onSubmit
                    }
                    initialValues={model.getInitialValuesQuery()}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        handleReset,
                        isValid,
                        errors,
                        setFieldValue,
                    }) => (
                        <Container>
                            <Grid container>
                                {model.getFormQuery(keys, values, handleChange, handleBlur, touched, errors, setFieldValue)}
                                <Grid container justify='center' style={{ marginTop: 10, marginBottom: 20 }}>
                                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submeter</Button>
                                </Grid>
                            </Grid>
                        </Container>
                    )}
                </Formik>
            </Paper>

            <Paper style={{ marginTop: 20 }}>

                <Container>
                    <Grid container>
                        <Grid container justify='center' style={{ marginTop: 10, marginBottom: 20 }}>

                            <Grid item xs={12} md={6}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Exibição de Linhas</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox checked={nivel} onChange={handleChangeCheckBox} name="nivel" />}
                                            label="Níveis de Rio"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={vazao} onChange={handleChangeCheckBox} name="vazao" />}
                                            label="Vazão"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox checked={chuva} onChange={handleChangeCheckBox} name="chuva" />}
                                            label="Chuva"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Grid container alignItems='flex-end'>
                                    <Typography id="discrete-slider" gutterBottom color='textSecondary'>
                                        Altura de Gráfico
                                    </Typography>
                                    <Slider
                                        value={heigthChartF}
                                        // getAriaValueText={valuetext}
                                        valueLabelDisplay="auto"
                                        step={50}
                                        marks
                                        min={100}
                                        max={500}
                                        onChange={((event, newValue) => { setHeigthChartF(newValue) })}
                                    />
                                </Grid>
                            </Grid>
                            <Button variant="contained" color="primary" onClick={handleSubmitConfig}>Aplicar</Button>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            {/* {console.log('lines', lines)} */}
            {Object.keys(list).map(key => (
                <Paper style={{ marginTop: 20 }} key={key}>
                    <Container style={{ paddingTop: 20 }}>
                        <Typography color='textSecondary'>
                            Município: {list[key].nome}
                        </Typography>
                    </Container>
                    <Container style={{ paddingTop: 10 }}>
                        <Typography color='textSecondary'>
                            Quantidade de Registros: {list[key].rows.length}
                        </Typography>
                    </Container>
                    <Grid container justify='center' alignItems='center' style={{ padding: 20 }}>
                        <ResponsiveContainer width="100%" height={heigthChart}>
                            <LineChart
                                data={list[key].rows}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 5,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="dataHora"
                                    tickFormatter={dateFormatter}
                                />
                                <YAxis />
                                <Tooltip content={<CustomTooltip lines={lines} />} />
                                <Legend />
                                {lines['nivel'] && <Line type="monotone" name="nível" dataKey="nivel" stroke="#8884d8" activeDot={{ r: 8 }} />}
                                {lines['vazao'] && <Line type="monotone" name="vazão" dataKey="vazao" stroke="#82ca9d" activeDot={{ r: 8 }} />}
                                {lines['chuva'] && <Line type="monotone" name="chuva" dataKey="chuva" stroke="#ffc658" activeDot={{ r: 8 }} />}
                            </LineChart>
                        </ResponsiveContainer>
                    </Grid>
                </Paper>
            ))}
        </PageHeader>
    )
}

export default DadosHidrometeorologicos;