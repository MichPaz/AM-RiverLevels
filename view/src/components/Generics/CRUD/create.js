import React, { useEffect } from 'react';
import { Formik } from 'formik';
import ModalGeneric, { ResetFormikForModal } from '../Modal/ModalGeneric';

const Create = (props) => {
    const { label, show, onHide, keys, model, actions, stores } = props

    async function onSubmit(values) {
        await actions.add(values);
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
        <Formik
            validationSchema={model.getValidation(keys)}
            onSubmit={
                onSubmit
            }
            initialValues={model.getInitialValues()}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                handleReset,
                isValid,
                errors,
                setFieldValue,
            }) => (
                <ModalGeneric title={`Cadastrar ${label}`} show={show} onHide={onHide} namebutton='Confirmar' onClick={handleSubmit}>
                    {model.getForm(keys, values, handleChange, handleBlur, touched, errors, setFieldValue)}
                    <ResetFormikForModal show={props.show} handleReset={handleReset} />
                </ModalGeneric>
            )
            }
        </Formik >
    );
}


export default Create;