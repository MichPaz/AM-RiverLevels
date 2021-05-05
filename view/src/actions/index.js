import AppDispatcher from '../dispatcher/appDispatcher';

class Actions {

    async list(q, CHANGE_EVENT) {
        AppDispatcher.dispatch({
            actionType: `LIST_${this.model}`,
            q,
            CHANGE_EVENT
        });
    };

    async getById(id) {
        AppDispatcher.dispatch({
            actionType: `GET_${this.model}_BY_ID`,
            id
        });
    };

    async add(values) {
        AppDispatcher.dispatch({
            actionType: `ADD_${this.model}`,
            values
        });
    };

    async update(values) {
        AppDispatcher.dispatch({
            actionType: `UPDATE_${this.model}`,
            values
        })
    }

    async delete(values) {
        AppDispatcher.dispatch({
            actionType: `DELETE_${this.model}`,
            values
        })
    }

    async setPage(page) {
        AppDispatcher.dispatch({
            actionType: `SET_PAGE_${this.model}`,
            page
        })
    }

    async setLimit(limit) {
        AppDispatcher.dispatch({
            actionType: `SET_LIMIT_${this.model}`,
            limit
        })
    }

}

export default Actions