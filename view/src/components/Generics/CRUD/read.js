import React from 'react';
import ModalGeneric from '../Modal/ModalInfo'
import { Grid, Typography } from '@material-ui/core'
import { dateTimeToView } from '../../utils/mask/datetime'


function Select(props) {

    const { label, item, keys, model } = props

    const itemView = model.toView(keys, item)

    return (
        <ModalGeneric
            show={props.show}
            // widthModal='lg'
            fullWidth={true}
            onHide={props.onHide}
            title={`Detalhes de ${label}`}

        >
            <hr />
            {itemView}
            <hr />
            <Grid item xs={12}>
                <Typography variant='body2' color='textSecondary'>
                    Cadastrado em: <strong>{dateTimeToView(item?.createdAt)}</strong>
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                    Modificado em: <strong>{dateTimeToView(item?.updatedAt)}</strong>
                </Typography>
            </Grid>
        </ModalGeneric>
    )
}

export default Select