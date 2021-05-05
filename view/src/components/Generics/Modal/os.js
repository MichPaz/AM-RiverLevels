import React, { useEffect, useState } from 'react';
import { Button,/*Box,*/ Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import ButtonAtomic from '../Atomics/ButtonAtomic';

export function ResetFormikForModal(props) {

    const { show, handleReset } = props

    const [flag, setFlag] = useState(true);

    useEffect(() => {

        if (show && flag) {
            handleReset()
            setFlag(false)
        }
        if (!show) {
            setFlag(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, flag])

    return (
        <></>
    )
}

function ModalScroll(props) {

    const {
        values,
        show,
        onHide,
        title,
        description,
        children,
        disabled,
        namebutton,
        onClick,
        /*nameButtonCancel,*/
        buttonCancel,
        maxWidth
    } = props

    const finishOS = () => {
        values.action = 3;
        props.onClick();
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (show) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [show]);

    return (
        <div>
            <Dialog
                open={show}
                onClose={onHide}
                scroll={'paper'}
                fullWidth
                maxWidth={maxWidth ? maxWidth : 'md'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                <DialogContent dividers>
                    <h5>{description}</h5>
                    {children}
                </DialogContent>
                <DialogActions>

                    <Button onClick={buttonCancel ? buttonCancel : onHide} color="primary">
                        Cancelar
                    </Button>

                    <Button style={values.action !== 2 ? { display: 'none' } : { display: '' }} onClick={finishOS} variant="contained" color="secondary">
                        Finalizar
                    </Button>
                    <ButtonAtomic style={values.action === 3 ? { display: 'none' } : { display: '' }} disabled={disabled} onClick={onClick} name={namebutton}>
                    </ButtonAtomic>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalScroll;