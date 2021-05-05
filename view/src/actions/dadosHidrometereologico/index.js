import Actions from '../index';
import AppDispatcher from '../../dispatcher/appDispatcher';

class AreasActions extends Actions {

  constructor() {
    super()
    this.model = 'DADOS_HIDROMETEOROLOGICO'
  }

  async list(query, CHANGE_EVENT) {
    AppDispatcher.dispatch({
      actionType: `LIST_${this.model}`,
      query,
      CHANGE_EVENT
    });
  };


}


export default new AreasActions();
