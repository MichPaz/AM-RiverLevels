const fs = require('fs')
const Estacao = require('../models').Estacao;
const Medicao = require('../models').Medicao;

async function populateByData(req, res) {

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

module.exports = { populateByData }