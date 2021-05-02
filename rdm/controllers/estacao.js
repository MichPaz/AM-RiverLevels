const Estacao = require('../models').Estacao;

module.exports = {
    list(req, res) {
        return Estacao
            .findAll()
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
