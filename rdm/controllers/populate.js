const fs = require('fs')
const axios = require('axios')
const Estacao = require('../models').Estacao;
const Medicao = require('../models').Medicao;
const DadosHidrometereologico = require('../models').DadosHidrometereologico;
const apiSnirh = require('./getDataAna').apiSnirh

async function populateBygetDadosTelemetricos(req, res) {

    const anaPathData = req.query.anaPathData

    if (!anaPathData)
        return res.status(400).send('query path is required')

    const path = `${process.cwd()}${'/../storage/json'}/${anaPathData}`

    if (!fs.existsSync(path)) {
        return res.status(400).send('anaPathData not found')
    }

    let files = fs.readdirSync(path)

    for (const file of files) {
        const filePath = path + '/' + file
        let data = JSON.parse(fs.readFileSync(filePath));

        console.log(`file ${files.indexOf(file) + 1} de ${files.length}`)
        console.log(filePath);

        for (const estacao of data) {
            await Estacao.create(estacao)
                .catch(() => { })

            if (Array.isArray(estacao.medicoes)) {
                for (let medicao of estacao.medicoes) {
                    medicao['horEstacao'] = medicao['id']['horEstacao']
                    medicao['horDataHora'] = medicao['id']['horDataHora']
                    delete medicao.id
                    await Medicao.create(medicao)
                        .catch(() => { })
                }
            }
        }
    }

    return res.send(anaPathData)
}

async function populateEstacoes(req, res) {

    const estacoesCod = req.query.estacoes.split(',')
    console.log('estacoes', estacoesCod)
    let resMsg = {
        cadastrado: [],
        erro: [],
    }


    for (const estacaoCod of estacoesCod) {
        console.log(`estacao ${estacoesCod.indexOf(estacaoCod) + 1} de ${estacaoCod.length}`)

        await axios.get(`${apiSnirh.url_base}/estacaos/search/findByIdIn?documentos=${estacaoCod}`)
            .then(async response => {
                let estacao = response.data._embedded.estacaos[0]

                estacao.id = estacao.idFormatadoComZero

                await Estacao.create(estacao)
                    .then(() => {
                        resMsg.cadastrado.push(estacao)
                        // console.log('estacao cadastrada:', estacao)
                    })
                    .catch((err) => {
                        resMsg.erro.push(estacao)
                        console.log('err:', err)
                        // console.log('estacao não cadastrada:', estacao)
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }


    return res.send(resMsg)
}

async function populateByDadosHidrometeorologicos(req, res) {

    const { anaPathData } = req.query

    if (!anaPathData)
        return res.status(400).send('query path is required')

    const path = `${process.cwd()}${'/../storage/json'}/dadosHidrometeorologicos/${anaPathData}`
    console.log('path', path)

    if (!fs.existsSync(path)) {
        return res.status(400).send('anaPathData not found')
    }

    let estacoes = fs.readdirSync(path)

    for (const estacao of estacoes) {

        console.log(`estacao ${estacoes.indexOf(estacao) + 1} de ${estacoes.length}`)
        const estacaoPath = path + '/' + estacao
        let files = fs.readdirSync(estacaoPath)

        for (const file of files) {

            const filePath = estacaoPath + '/' + file
            let data = JSON.parse(fs.readFileSync(filePath));

            console.log(`file ${files.indexOf(file) + 1} de ${files.length}`)
            console.log(filePath);

            for (let medicao of data) {
                await DadosHidrometereologico.create(medicao)
                    .catch(() => { })
            }
        }
    }

    return res.send(anaPathData)
}

module.exports = { populateBygetDadosTelemetricos, populateEstacoes, populateByDadosHidrometeorologicos }