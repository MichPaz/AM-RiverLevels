import React, { useEffect } from 'react';

import ModalGeneric from '../Modal/ModalGeneric';

function DeleteItem(props) {

    const { label, messageDelete, show, onHide, item, actions, stores } = props

    async function onSubmit() {
        actions.delete(item)
    }

    useEffect(() => {
        if (show) {
            const onChange = () => {
                if (stores.getChangeRequest()) {
                    onHide()
                    stores.setChangeRequest(undefined)
                }
            }

            stores.addChangeListener(onChange);

            return function cleanup() {
                stores.removeChangeListener(onChange);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    return (
        <ModalGeneric title={`Apagar ${label}`} show={show} onHide={onHide} namebutton='Confirmar' onClick={onSubmit}>
            {messageDelete}
        </ModalGeneric>
    );
}

export default DeleteItem;