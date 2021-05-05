import React from 'react';
import {
    Button, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';

/*
--------props-------
show
onHide
widthModal
fullWidth
title
*/

export default function MaxWidthDialog(props) {

    const open = props.show
    const handleClose = props.onHide
    const widthModal = props.widthModal
    const { closeLabel } = props

    return (
        <Dialog
            fullWidth={props.fullWidth}
            maxWidth={widthModal ? widthModal : 'md'}
            open={open}
            onClose={handleClose}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title">{props.title}</DialogTitle>

            <DialogContent dividers>
                <h5>{props.description}</h5>
                {props.children}



            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" className="MuiButton-contained ButtonAtomic">
                    {closeLabel ? closeLabel : 'Fechar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}