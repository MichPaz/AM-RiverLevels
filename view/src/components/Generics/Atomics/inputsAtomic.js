import React from 'react'
import ptBRLocale from "date-fns/locale/pt-BR"
import {
    TextField, FormControl, Select, InputLabel,
    MenuItem, FormHelperText
} from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

export const TextFieldAtomic = (props) => {

    const { prop, disabled, values, handleChange, handleBlur, touched, errors } = props

    const handleChangeMask = e => {
        if (prop.toForm)
            e.target.value = prop.toForm(e.target.value)
        handleChange(e)
    }

    return (
        <TextField
            disabled={disabled}
            type={prop.type ? prop.type : 'text'}
            label={prop.label}
            name={prop.key}
            value={values[prop.key]}
            multiline={prop.inputType === 'multiline'}
            rows={prop.inputType === 'multiline' ? 4 : undefined}
            required={prop.required}

            // margin="dense"
            variant="outlined"
            fullWidth

            onChange={handleChangeMask}
            onBlur={handleBlur}
            helperText={touched[prop.key] ? errors[prop.key] : (prop.helperText || '')}
            error={touched[prop.key] && Boolean(errors[prop.key])}
        />
    )
}

export const MultlineFieldAtomic = (props) => {

    const { prop, values, disabled, handleChange, handleBlur, touched, errors } = props

    const handleChangeMask = e => {
        if (prop.toForm)
            e.target.value = prop.toForm(e.target.value)
        handleChange(e)
    }

    return (
        <TextField
            disabled={disabled}
            type="text"
            label={prop.label}
            name={prop.key}
            value={values[prop.key]}
            required={prop.required}

            // margin="dense"
            variant="outlined"
            fullWidth

            onChange={handleChangeMask}
            onBlur={handleBlur}
            helperText={touched[prop.key] ? errors[prop.key] : (prop.helperText || '')}
            error={touched[prop.key] && Boolean(errors[prop.key])}
        />
    )
}

export const PasswordFieldAtomic = (props) => {

    const { prop, values, disabled, handleChange, handleBlur, touched, errors } = props

    const handleChangeMask = e => {
        if (prop.toForm)
            e.target.value = prop.toForm(e.target.value)
        handleChange(e)
    }

    return (
        <TextField
            disabled={disabled}
            type="password"
            label={prop.label}
            name={prop.key}
            value={values[prop.key]}
            required={prop.required}

            // margin="dense"
            variant="outlined"
            fullWidth

            onChange={handleChangeMask}
            onBlur={handleBlur}
            helperText={touched[prop.key] ? errors[prop.key] : (prop.helperText || '')}
            error={touched[prop.key] && Boolean(errors[prop.key])}
        />
    )
}


export const DateFieldAtomic = (props) => {

    const { prop, values, disabled, handleChange, handleBlur, touched, errors } = props

    const handleChangeMask = e => {
        if (prop.toForm)
            e.target.value = prop.toForm(e.target.value)
        handleChange(e)
    }

    return (
        <TextField
            disabled={disabled}
            type="date"
            label={prop.label}
            name={prop.key}
            value={values[prop.key]}
            placeholder={prop.placeholder || ""}
            required={prop.required}

            // margin="dense"
            variant="outlined"
            fullWidth

            onChange={handleChangeMask}
            onBlur={handleBlur}
            helperText={touched[prop.key] ? errors[prop.key] : (prop.helperText || '')}
            error={touched[prop.key] && Boolean(errors[prop.key])}

            InputLabelProps={{
                shrink: true,
            }}
        />
    )
}

export function DateTimeFieldAtomic(props) {
    const { prop, disabled, values, /*handleChange,*/ handleBlur, touched, errors, setFieldValue } = props


    const handleChangeMask = (value) => {
        const date = value.toISOString().slice(0, 20) + '000Z'
        setFieldValue(prop.key, date)
    }

    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
                <KeyboardDateTimePicker
                    autoOk
                    disableFuture
                    hideTabs
                    fullWidth

                    disabled={disabled}
                    name={prop.key}
                    inputVariant="outlined"
                    // margin='dense'
                    helperText={touched[prop.key] ? errors[prop.key] : (prop.helperText || '')}
                    value={values[prop.key]}
                    onChange={handleChangeMask}
                    onBlur={handleBlur}
                    label={prop.label}
                    format="dd/MM/yyyy hh:mm a"
                    error={touched[prop.key] && Boolean(errors[prop.key])}
                />

            </MuiPickersUtilsProvider>
        </>
    );
}


// export const DateTimeFieldAtomic = (props) => {

//     const { prop, values, handleChange, handleBlur, touched, errors } = props

//     const handleChangeMask = e => {
//         if (prop.toForm)
//             e.target.value = prop.toForm(e.target.value)
//         handleChange(e)
//     }

//     return (
//         <TextField
//             type="datetime-local"
//             label={prop.label}
//             name={prop.key}
//             value={values[prop.key]}
//             placeholder={prop.placeholder || ""}
//             required={prop.required}

//             margin="dense"
//             variant="outlined"
//             fullWidth

//             onChange={handleChangeMask}
//             onBlur={handleBlur}
//             helperText={touched[prop.key] ? errors[prop.key] : (prop.helperText || '')}
//             error={touched[prop.key] && Boolean(errors[prop.key])}

//             InputLabelProps={{
//                 shrink: true,
//             }}
//         />
//     )
// }


export const SelectFieldAtomic = (props) => {

    const { items, disabled, prop, values, handleChange, handleBlur, touched, errors } = props

    return (
        <FormControl variant="outlined" /*margin='dense'*/ fullWidth required={prop.required} disabled={disabled}>
            <InputLabel>{prop.label}</InputLabel>
            <Select
                label={prop.label}
                name={prop.key}
                value={values[prop.key]}
                onChange={handleChange}

                onBlur={handleBlur}
                error={touched[prop.key] && Boolean(errors[prop.key])}
            >
                {items.map(item => (
                    (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                ))}
            </Select>
            <FormHelperText error>{touched[prop.key] ? errors[prop.key] : ""}</FormHelperText>
        </FormControl>
    )
}


export const SelectFieldAtomicSimple = (props) => {

    const { items, disabled, prop, value, onChange } = props

    return (
        <FormControl variant="outlined" /*margin='dense'*/ fullWidth required={prop.required} disabled={disabled}>
            <InputLabel>{prop.label}</InputLabel>
            <Select
                label={prop.label}
                name={prop.key}
                value={value}
                onChange={onChange}
            >
                {items.map(item => (
                    (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)
                ))}
            </Select>
        </FormControl>
    )
}
