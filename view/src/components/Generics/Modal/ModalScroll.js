import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonAtomic from '../../GenericsAtomics/ButtonAtomic';

function ModalScroll(props) {

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (props.show) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [props.show]);

    return (
        <div>
            <Dialog
                open={props.show}
                onClose={props.onHide}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{props.title}</DialogTitle>
                <DialogContent dividers>
                    <h5>{props.description}</h5>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onHide} color="primary">
                        Cancelar
                    </Button>
                    <ButtonAtomic onClick={props.onClick} name={props.namebutton}>
                    </ButtonAtomic>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalScroll;