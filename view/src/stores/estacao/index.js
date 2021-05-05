import ModulesStores from '../modules'
// import Model from '../../models/'


class Stores extends ModulesStores {

    constructor() {
        super('ESTACAO', '/estacao'/*, Model*/)
    }

}

export default new Stores()