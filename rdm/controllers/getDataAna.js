const axios = require('axios')
const fs = require('fs')
const exec = require('child_process').execSync
var convert = require('xml-js')

const daysRangeDefault = 90

const estacoes = [
    '867050',
    '15559280',
    // '15559281',
    // '15559282',
    // '15559283',
    '15459280',
    '3059210'
]

const apiSnirh = {
    url_base: 'http://www.snirh.gov.br/hidroweb/rest',
    route: '/api/documento/gerarTelemetricas',
    queryParams: (startDate, endDate) => ({
        codigosEstacoes: estacoes.join([separador = ',']),
        tipoArquivo: '3',
        periodoInicial: startDate,
        periodoFinal: endDate,
    }),
    queryParamsWithEstacoes: (estacoes, startDate, endDate) => ({
        codigosEstacoes: estacoes.join([separador = ',']),
        tipoArquivo: '3',
        periodoInicial: startDate,
        periodoFinal: endDate,
    })
}

function slicePeriods(period, daysRange) {
    let { startDate, endDate } = period
    let periods = []

    startDate = new Date(startDate)
    endDate = new Date(endDate)
    dateHandle = startDate

    while (dateHandle.getTime() < endDate.getTime()) {
        const sDate = new Date(dateHandle)
        dateHandle.setDate(dateHandle.getDate() + daysRange)
        if (dateHandle.getTime() > endDate.getTime()) {
            dateHandle = endDate
        }
        const period = {
            startDate: sDate.toISOString(),
            endDate: dateHandle.toISOString()
        }
        periods.push(period)
    }

    return periods
}

async function getDadosTelemetricos(req, res) {

    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const daysRange = req.query.daysRange || daysRangeDefault

    console.log(daysRange)

    if (!startDate)
        return res.status(400).send('query startDate is required')

    if (!endDate)
        return res.status(400).send('query endDate is required')

    const periods = slicePeriods({ startDate, endDate }, parseInt(daysRange))

    const anaPathData = new Date().toISOString().replace(/[:|\.]/g, '-')
    const path = `${process.cwd()}${'/../storage/json'}/${anaPathData}`

    for (const period of periods) {
        console.log(`periodo ${periods.indexOf(period) + 1} de ${periods.length}`)
        await axios.get(`${apiSnirh.url_base}${apiSnirh.route}`, {
            params: apiSnirh.queryParams(period.startDate, period.endDate)
        })
            .then(response => {
                if (!fs.existsSync(path)) {
                    exec(`mkdir ${path}`, function (err) {
                        console.log(err)
                    })
                }
                const fileName = `/${period.startDate.slice(0, 10)}to${period.endDate.slice(0, 10)}.json`
                fs.writeFileSync(path + fileName, JSON.stringify(response.data))
            })
            .catch(error => {
                console.log(error);
            });
    }


    return res.send(path)
}

const formatToJson = (xmlResponse) => {

    function formatMedicao(m, atribs) {
        let medicao = {}

        for (const atrib of atribs) {
            medicao[atrib] = Boolean(m[atrib]) && Boolean(m[atrib]['_text']) ? m[atrib]['_text'] : null
        }
        return medicao
    }

    let json = convert.xml2js(xmlResponse, { compact: true })
    let medicoes = json['DataTable']['diffgr:diffgram']['DocumentElement']['DadosHidrometereologicos']
    medicoes = medicoes.map(m => formatMedicao(
        m,
        [
            'CodEstacao',
            'DataHora',
            'Vazao',
            'Nivel',
            'Chuva',
        ]
    ))

    return JSON.stringify(medicoes)
}

const apiTelemetria = {
    url_base: 'http://telemetriaws1.ana.gov.br',
    route: '/ServiceANA.asmx/DadosHidrometeorologicos',
    queryParams: (estacao, startDate, endDate) => ({
        codEstacao: estacao,
        dataInicio: startDate,
        dataFim: endDate,
    })
}

async function getDadosHidrometeorologicos(req, res) {

    const estacoes = req.query.estacoes.split(',')
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const daysRange = req.query.daysRange || daysRangeDefault

    console.log('estacoes', estacoes)

    if (!startDate)
        return res.status(400).send('query startDate is required')

    if (!endDate)
        return res.status(400).send('query endDate is required')

    const periods = slicePeriods({ startDate, endDate }, parseInt(daysRange))
    console.log('periods', periods)

    const anaPathData = new Date().toISOString().replace(/[:|\.]/g, '-')


    for (const estacao of estacoes) {

        let count = 1

        console.log(`estacao ${estacoes.indexOf(estacao) + 1} de ${estacoes.length}`)
        const path = `${process.cwd()}${'/../storage/json/dadosHidrometeorologicos'}/${anaPathData}/${estacao}`

        for (const period of periods) {

            console.log(`periodo ${periods.indexOf(period) + 1} de ${periods.length}`)

            console.log(`=========== fase ${count} de ${estacoes.length * periods.length} ===========`)
            count++

            await axios.get(`${apiTelemetria.url_base}${apiTelemetria.route}`, {
                params: apiTelemetria.queryParams(estacao, period.startDate, period.endDate)
            })
                .then(response => {
                    if (!fs.existsSync(path)) {
                        exec(`mkdir -p ${path}`, function (err) {
                            console.log(err)
                        })
                    }
                    const fileName = `/${period.startDate.slice(0, 10)}to${period.endDate.slice(0, 10)}.json`
                    fs.writeFileSync(path + fileName, formatToJson(response.data))
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }


    return res.send(anaPathData)
}

module.exports = { getDadosTelemetricos, getDadosHidrometeorologicos, apiSnirh }