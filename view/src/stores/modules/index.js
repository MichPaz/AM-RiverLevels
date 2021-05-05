import EventEmitter from 'events';
import AppDispatcher from '../../dispatcher/appDispatcher';
import api from '../../services/api';
import FeedbackMessage from '../feedbackMessage/snack'
import ErrorHandling from '../../errors'
// import SecurityStores from '../security'


class ModulesStores extends EventEmitter {

    constructor(modelName, route, Model) {
        super();

        this.modelName = modelName
        this.route = route
        this.Model = Model

        this.list = []
        this.item = undefined
        this.toRestore = undefined
        this.restoreConfirmation = undefined
        this.id = undefined
        this.query = undefined

        this.CHANGE_EVENT = 'CHANGE';
        this.limit = 10;
        this.page = 1
        this.lastPage = 1
        this.count = 0
        this.changeRequest = undefined

        this.dispatchMessage = (m) => FeedbackMessage.setMessage(m)
        if (Model) this.Error = new ErrorHandling(Model.getModel())
        AppDispatcher.register(this.registerActions.bind(this));
    }

    async registerActions(action) {

        switch (action.actionType) {

            case `LIST_${this.modelName}`:
                this.query = action.query || ``
                await this.setList();
                this.emit(this.CHANGE_EVENT);
                break;

            case `GET_${this.modelName}_BY_ID`:
                this.id = action.id
                await this.setItem();
                this.emit(this.CHANGE_EVENT);
                break;

            case `ADD_${this.modelName}`:
                await this.add(action.values)
                await this.setList();
                this.emit(this.CHANGE_EVENT);
                break;

            case `UPDATE_${this.modelName}`:
                await this.update(action.values)
                await this.setList();
                await this.setItem();
                this.emit(this.CHANGE_EVENT);
                break;

            case `DELETE_${this.modelName}`:
                await this.delete(action.values)
                await this.setList();
                this.emit(this.CHANGE_EVENT);
                break;

            case `SET_PAGE_${this.modelName}`:
                this.setPage(action.page);
                await this.setList();
                this.emit(this.CHANGE_EVENT);
                break;

            case `SET_LIMIT_${this.modelName}`:
                this.setLimit(action.limit);
                await this.setList();
                this.emit(this.CHANGE_EVENT);
                break;

            default:
                return true;
        }
        return true;

    }


    async setList(list) {

        if (list) {
            this.list = list
        } else {
            const page = this.page
            const config = { params: {} }

            if (this.limit)
                config.params.limit = this.limit

            if (this.getOffset() !== undefined)
                config.params.offset = this.getOffset()

            if (this.q)
                config.params.q = this.q

            await api.get(`${this.route}`,
                config
            )
                .then(
                    async response => {
                        this.list = response.data.rows;
                        this.setCount(response.data.count);

                        // corrigir extrapolação da variável page
                        if (this.page < page) {
                            await this.setList()
                        }
                    }
                )
                .catch((err) => {
                    this.list = []
                    this.errorHandling(err)
                })
        }
    }

    getList() {
        return this.list;
    }

    async setItem(values) {
        if (values) {
            this.item = values
        } else {
            await api.get(`${this.route}/${this.id}`)
                .then(
                    response => {
                        this.item = response.data;
                    }
                )
                .catch((err) => {
                    this.item = undefined
                    this.errorHandling(err)
                })
        }
    }


    getItem() {
        return this.item
    }

    async add(values) {
        await api.post(`${this.route}`, this.Model.toStore(values))
            .then(() => {
                this.setChangeRequest(true)
                this.dispatchMessage({ variant: 'success', message: 'Cadastrado com sucesso' })
            })
            .catch((err) => {
                this.setChangeRequest(false)
                this.errorHandling(err)
                this.messageErrors(err, 'Erro ao cadastrar')
            })
    }

    async update(values) {
        await api.put(`${this.route}/${values.id}`, this.Model.toStore(values))
            .then(() => {
                this.setChangeRequest(true)
                this.dispatchMessage({ variant: 'success', message: 'Atualizado com sucesso' })
            })
            .catch((err) => {
                this.setChangeRequest(false)
                this.errorHandling(err)
                this.messageErrors(err, 'Erro ao editar')
            })
    }

    async delete(values) {
        await api.delete(`${this.route}/${values.id}`, { data: { foo: "bar" } })
            .then(async () => {
                this.setChangeRequest(true)
                this.dispatchMessage({ variant: 'success', message: 'Apagado com sucesso' })
            })
            .catch((err) => {
                this.setChangeRequest(false)
                this.errorHandling(err)
                this.messageErrors(err, 'Erro ao apagar')
            })
    }

    setSearch(q) {
        this.q = q
    }

    getSearch() {
        return this.q
    }

    setLimit(limit) {
        this.limit = limit
        this.setLastPage()
        this.setPage(this.page)
    }

    getLimit() {
        return this.limit
    }

    setCount(count) {
        this.count = count
        this.setLastPage()
        this.setPage(this.page)
    }

    setLastPage() {
        this.lastPage = Math.ceil(this.count / this.limit)
    }

    getCount() {
        return this.count
    }

    getLastPage() {
        return this.lastPage
    }

    setPage(page) {

        if (page) {
            if (page > this.lastPage)
                page = this.lastPage

            if (page <= 0)
                page = 1
        }

        this.page = page
    }

    getPage() {
        return this.page;
    }

    getOffset() {
        let offset
        if (this.page)
            offset = ((this.page - 1) * this.limit) > 0 ? (this.page - 1) * this.limit : 0
        return offset
    }


    getPagination() {
        let query = ''
        if (this.limit)
            query = `offset=${this.getOffset()}&limit=${this.limit}`
        return query
    }

    errorHandling(error) {
        // const red = errorRedirect(error)
        // if (red) {
        //     this.dispatchMessage({ variant: 'error', message: red })
        // SecurityStores.emit(SecurityStores.CHANGE_EVENT)
        // }
    }

    messageErrors(err, messageDefault) {
        const errors = err.response.data.errors
        if (Array.isArray(errors)) {
            for (const error of errors) {
                if (this.Error.isToRestore(error)) {
                    this.toRestore = error.object
                    // break
                }
                let msg = this.Error.getMessage(error)
                msg = msg ? msg : messageDefault
                this.dispatchMessage({ variant: 'error', message: msg })
            }
        } else {
            if (!errors || errors.length === 0) {
                this.dispatchMessage({ variant: 'error', message: messageDefault })
            }
        }
    }

    getToRestore() {
        return this.toRestore
    }

    setToRestore(values) {
        this.toRestore = values
    }


    setChangeRequest(value) {
        this.changeRequest = value
    }

    getChangeRequest() {
        return this.changeRequest
    }

    setRestoreConfirmation(value) {
        this.restoreConfirmation = value
    }

    getRestoreConfirmation() {
        return this.restoreConfirmation
    }




    addChangeListener(callback, CHANGE_EVENT) {
        this.on(CHANGE_EVENT ? CHANGE_EVENT : this.CHANGE_EVENT, callback);
    }

    removeChangeListener(callback, CHANGE_EVENT) {
        this.removeListener(CHANGE_EVENT ? CHANGE_EVENT : this.CHANGE_EVENT, callback);
    }

}
export default ModulesStores