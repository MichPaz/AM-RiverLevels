import ModulesStores from '../modules'
import Model from '../../models/dadosHidrometeorologico'
import api from '../../services/api'


class Stores extends ModulesStores {

    constructor() {
        super('DADOS_HIDROMETEOROLOGICO', '/dadosHidrometereologico', Model)
    }

    async setList(list) {

        if (list) {
            this.list = list
        } else {
            const page = this.page
            let config = { params: {} }

            const { estacoes } = this.query

            if (this.query)
                config.params = Model.toStoreQuery(this.query)

            let list = {}
            let count = 0

            for (const estacao of estacoes) {

                config.params.estacao = estacao.value

                await api.get(`${this.route}`,
                    config
                )
                    .then(
                        async response => {
                            list[estacao.value] = {
                                nome: estacao.label,
                                rows: response.data.rows
                            }

                            count += response.data.count

                            // corrigir extrapolação da variável page
                            if (this.page < page) {
                                await this.setList()
                            }

                            this.dispatchMessage({ variant: 'success', message: `Cotas de de ${estacao.label} obtidas com sucesso` })
                        }
                    )
                    .catch((err) => {
                        this.list = []
                        this.errorHandling(err)
                        this.dispatchMessage({ variant: 'error', message: `Erro ao obter cotas de ${estacao.label}` })
                    })
            }
            this.list = list
            this.setCount(count)
        }
    }

}

export default new Stores()