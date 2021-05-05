import React, { useState, useEffect } from 'react';

import { Snackbar, Fade } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import FeedbackMessageStores from '../stores/feedbackMessage/alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FeedbackMessage(props) {

    const [message, setMessage] = useState({ status: 0, message: '' })
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    function severetyAlert(code) {

        const sucessCodeStatus = [200, 201, 202, 203]
        const warningCodeStatus = [300]
        const errorCodeStatus = [400, 403, 415, 404, 500]

        if (sucessCodeStatus.includes(code)) {
            return 'success'
        }
        if (warningCodeStatus.includes(code)) {
            return 'warning'
        }
        if (errorCodeStatus.includes(code)) {
            return 'error'
        }
        return 'information'
    }

    useEffect(() => {

        async function _onChange() {
            setMessage(FeedbackMessageStores.getMessage())
            if (FeedbackMessageStores.getMessage().message !== '') {
                setOpen(true);
            }
        }

        async function startValues() {
            FeedbackMessageStores.addChangeListener(_onChange)
        }

        startValues();

        return function cleanup() {
            FeedbackMessageStores.removeChangeListener(_onChange)
        };

    }, [])

    return (
        <Snackbar open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={Fade}
        >
            <Alert onClose={handleClose} severity={severetyAlert(message.status)}>
                {message.message}
            </Alert>
        </Snackbar>
    );
}

export default FeedbackMessage;