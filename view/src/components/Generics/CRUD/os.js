import React, { useEffect } from 'react';
import ModalGeneric from '../Modal/os';

import { Formik } from 'formik';




function Update(props) {

    const { /*label,*/ item, show, onHide, keys, model, actions, stores } = props
    //statusAtual
    //0-inativa 1-ativa 2-pausada 3-finalizada

    async function onSubmit(values) {
 
        await actions.update(values);
    }

 
    useEffect(() => {
        if (show) {
            const onChange = () => {
                if (stores.getChangeRequest()) {
                    onHide()
                    stores.setItem(undefined)
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
            initialValues={model.toForm(item)}
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
                <ModalGeneric title={`Ordem de Serviço`} show={show}  values={values} onHide={onHide}  namebutton={`${item.statusAtual === 0 ? 'INICIAR' : 'PAUSAR'}`} onClick={handleSubmit}>
                    {model.getForm(keys, values, handleChange, handleBlur, touched, errors, setFieldValue)}
                     {/* <ResetFormikForModal show={props.show} handleReset={handleReset} /> */}
                </ModalGeneric>
            )
            }
        </Formik >
    )
}

export default Update