import EventEmitter from 'events';

const CHANGE_EVENT = 'CHANGE';

let _message = { status: 0, message: '' };

class FeedbackMessageStores extends EventEmitter {

    setMessage(msg){
        _message = msg;
        this.emit(CHANGE_EVENT);
    }

    getMessage() {
        return _message;
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }



}
export default new FeedbackMessageStores();