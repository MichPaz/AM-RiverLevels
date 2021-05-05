import React from 'react';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core'
import {
    DateFieldAtomic, DateTimeFieldAtomic, TextFieldAtomic, PasswordFieldAtomic
} from '../components/Generics/Atomics/inputsAtomic'
import ViewAtrib from '../components/Generics/ViewAtrib'

/*
const model = [
    {
        label: undefined,        string
        key: undefined,          string
        inputType: undefined,    ['text', 'password', 'select', 'check', 'number', 'date', 'datetime']
        toForm: undefined,       function
        toStore: undefined,      function
        value: undefined,        [string, float]
        validation: undefined,   [Yup.object]
        default: undefined,      [string, float]
        helperText: undefined,   string,
        required: undefined,     boolean
    }
]
*/

const styleGrid = {
    marginTop: 16,
    marginLeft: 8,
    marginRigth: 8,
    marginBotton: 8,
}
class Model {

    toStore(values) {
        let valuesToStore = {}
        for (const prop of this.model) {
            const value = values[prop.key]
            if (value || value === null) {
                if ((typeof value === 'string' && value?.trim()?.length === 0)) {
                    valuesToStore[prop.key] = null
                } else {
                    valuesToStore[prop.key] = prop.toStore ? prop.toStore(value) : value
                }
            }
        }
        return valuesToStore
    }

    toForm(values) {
        let valuestoForm = {}
        for (const prop of this.model) {
            const value = values[prop.key]
            if (value) {
                valuestoForm[prop.key] = prop.toForm ? prop.toForm(value) : value
            } else {
                valuestoForm[prop.key] = prop.default
            }

        }
        return valuestoForm
    }

    toView(keys, values) {
        let inputs = []
        for (const key of keys) {
            const prop = this.model.find(e => e?.key === key.key)
            if (prop) {
                const show = (value) => prop.toView ? prop.toView(value) : (prop.toForm ? prop.toForm(value) : value)
                inputs.push(
                    <ViewAtrib
                        key={key.key}
                        label={prop.label}
                        md={key.md}
                        value={show(values[key.key])}
                    />
                )
            }
        }
        return <Grid container>{inputs}</Grid>
    }

    getValidation(keys) {
        let validation = {}
        for (const key of keys) {
            const m = this.model.find(e => e?.key === key.key)
            if (m?.validation) validation[m.key] = m.validation
        }
        return Yup.object(validation)
    }

    getInitialValues() {
        let initialValues = {}
        for (const prop of this.model) {
            initialValues[prop.key] = prop.default
        }
        return initialValues
    }

    getForm(keys, values, handleChange, handleBlur, touched, errors, setFieldValue) {
        let inputs = []
        for (const key of keys) {
            const prop = this.model.find(e => e?.key === key.key)
            if (prop) {
                if (prop.inputType === 'text' || prop.inputType === 'multiline') {
                    inputs.push(
                        <Grid item xs={12} md={key.md} key={prop.key}>
                            <div style={styleGrid}>
                                <TextFieldAtomic
                                    prop={prop}
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    touched={touched}
                                    errors={errors}
                                    disabled={key.disabled}
                                />
                            </div>
                        </Grid>
                    )
                }
                if (prop.inputType === 'password') {
                    inputs.push(
                        <Grid item xs={12} md={key.md} key={prop.key}>
                            <div style={styleGrid}>
                                <PasswordFieldAtomic
                                    prop={prop}
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    touched={touched}
                                    errors={errors}
                                    disabled={key.disabled}
                                />
                            </div>
                        </Grid>
                    )
                }
                if (prop.inputType === 'date') {
                    inputs.push(
                        <Grid item xs={12} md={key.md} key={prop.key}>
                            <div style={styleGrid}>
                                <DateFieldAtomic
                                    prop={prop}
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    touched={touched}
                                    errors={errors}
                                    disabled={key.disabled}
                                />
                            </div>
                        </Grid>
                    )
                }
                if (prop.inputType === 'datetime') {
                    inputs.push(
                        <Grid item xs={12} md={key.md} key={prop.key}>
                            <div style={styleGrid}>
                                <DateTimeFieldAtomic
                                    prop={prop}
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    touched={touched}
                                    errors={errors}
                                    setFieldValue={setFieldValue}
                                    disabled={key.disabled}
                                />
                            </div>
                        </Grid>
                    )
                }
                if (prop.inputType === 'select') {
                    inputs.push(
                        <Grid item xs={12} md={key.md} key={prop.key}>
                            <prop.component
                                prop={prop}
                                values={values}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                touched={touched}
                                errors={errors}
                                setFieldValue={setFieldValue}
                                disabled={key.disabled}
                            />
                        </Grid >
                    )
                }
            }
        }
        return <Grid container>{inputs}</Grid>
    }
}

export default Model