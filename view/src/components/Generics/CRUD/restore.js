import React, { useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core'
import ModalGeneric from '../Modal/ModalGeneric';
import { dateTimeToView } from '../../utils/mask/datetime'

function RestoreItem(props) {

    const { show, onHide, item, actions, stores, model, keys, onHidePreview } = props

    const itemView = model.toView(keys, item)

    async function onSubmit() {
        const values = {
            id: item.id,
            deletedAt: null,
        }
        actions.update(values)
        stores.setRestoreConfirmation(true)
    }

    const handleCancel = () => {
        onHide()
        stores.setToRestore(undefined)
        stores.setRestoreConfirmation(undefined)
    }

    useEffect(() => {
        if (show) {
            const onChange = () => {
                if (stores.getRestoreConfirmation()) {
                    onHide()
                    stores.setToRestore(undefined)
                    stores.setRestoreConfirmation(undefined)
                    stores.setChangeRequest(undefined)
                    // stores.setChangeRequest(undefined)
                    onHidePreview()
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
        <ModalGeneric
            maxWidth={'lg'}
            title={`Detalhes do Registro Excluído`}
            nameButtonCancel='Não Restaurar'
            show={show}
            onHide={onHide}
            buttonCancel={handleCancel}
            namebutton='Restaurar'
            onClick={onSubmit}
        >
            <Typography variant='body1' color='textSecondary'>
                O formulário que você acabou de submeter possui correspondência com um registro que foi excluído em {dateTimeToView(item?.deletedAt)}, você deseja restaurar esse registro que está sendo exibido abaixo? <br />
            </Typography>

            <Grid item xs={12} style={{ height: 20 }} />

            {itemView}

            <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary'>
                    Cadastrado em: <strong>{dateTimeToView(item?.createdAt)}</strong>
                </Typography>
                {/* <Typography variant='body2' color='textSecondary'>
                    Modificado em: <strong>{dateTimeToView(item?.updatedAt)}</strong>
                </Typography> */}
                <Typography variant='body2' color='textSecondary'>
                    Apagado em: <strong>{dateTimeToView(item?.deletedAt)}</strong>
                </Typography>
            </Grid>
        </ModalGeneric>
    );
}

export default RestoreItem;