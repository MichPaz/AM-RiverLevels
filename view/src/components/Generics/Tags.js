/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, CircularProgress } from '@material-ui/core';

export function TagsFormik(props) {
    const { prop, values, limitValue, handleBlur, touched, errors, setFieldValue } = props
    const { limitTags, options, margin, label, loading } = props

    let initValue = options.find(e => e?.value === values[prop.key])
    initValue = initValue ? [initValue] : []
    const [value, setValue] = useState(initValue)

    const onChange = (event, newValue) => {
        const len = newValue.length
        const limit = limitValue !== undefined ? limitValue : len
        setFieldValue(prop.key, newValue.slice(len - limit, len))
    }

    useEffect(() => {
        let valueAux = options.filter(e => values[prop.key]
            .map(e => e?.value).includes(e.value)
        )
        valueAux = valueAux ? valueAux : []
        setValue([...valueAux])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options, values[prop.key]])

    let errorsText
    if (errors[prop.key]) {
        if (Array.isArray(errors[prop.key]))
            errorsText = errors[prop.key].map(e => e?.value ? e.value : e)
        else
            errorsText = errors[prop.key]
    }

    return (
        <Autocomplete
            multiple
            noOptionsText='Sem Opções'
            // id="tags-outlined"
            limitTags={limitTags}
            options={options}
            value={value}
            loading={loading}
            loadingText='Carregando...'
            onChange={onChange}
            getOptionSelected={(option, value) => option.value === value.value}
            getOptionLabel={(option) => option.label}
            // defaultValue={[]}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    margin={margin ? margin : 'normal'}
                    fullWidth
                    required={prop.required}
                    name={prop.key}
                    variant="outlined"
                    label={label ? label : "Opções"}
                    placeholder={label ? label : "Opções"}

                    onBlur={handleBlur}
                    error={touched[prop.key] && Boolean(errors[prop.key])}
                    helperText={touched[prop.key] ? errorsText : (prop.helperText || '')}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}


export default function Tags(props) {

    return (
        <Autocomplete
            multiple
            noOptionsText='Sem Opções'
            id="tags-outlined"
            limitTags={props.limitTags}
            options={props.options}
            value={props.value}
            onChange={(event, newValue) => {
                props.setValue(newValue);
            }}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.label}
            defaultValue={[]}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    margin={props.margin ? props.margin : 'normal'}
                    fullWidth
                    variant="outlined"
                    label={props.label ? props.label : "Opções"}
                    placeholder={props.label ? props.label : "Opções"}
                />
            )}
        />
    );
}