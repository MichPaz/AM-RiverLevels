const Estacao = require('../models').DadosHidrometereologico;
const Op = require('sequelize').Op;

module.exports = {
    list(req, res) {

        const { startDate, endDate } = req.query
        const estacao = req.query.estacao
        let { limit, offset } = req.query

        if (!startDate)
            return res.status(400).send({ message: 'query startDate is required' });

        if (!endDate)
            return res.status(400).send({ message: 'query endDate is required' });


        return Estacao
            .findAndCountAll(
                {
                    where: {
                        codEstacao: estacao,
                        dataHora: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    limit,
                    offset,
                    logging: true,
                    order: [['dataHora', 'ASC']]
                }
            )
            .then((estacoes) => res.status(200).send(estacoes))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Estacao
            .findByPk(req.params.id)
            .then((course) => {
                if (!course) {
                    return res.status(404).send({
                        message: 'Estacao Not Found',
                    });
                }
                return res.status(200).send(course);
            })
            .catch((error) => res.status(400).send(error));
    },

};
