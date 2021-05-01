const axios = require('axios')
const fs = require('fs')
const exec = require('child_process').execSync

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

const apiANA = {
    url_base: 'http://www.snirh.gov.br/hidroweb/rest/api',
    route: '/documento/gerarTelemetricas',
    queryParams: (startDate, endDate) => ({
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

async function getData(req, res) {

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
        await axios.get(`${apiANA.url_base}${apiANA.route}`, {
            params: apiANA.queryParams(period.startDate, period.endDate)
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

module.exports = { getData }