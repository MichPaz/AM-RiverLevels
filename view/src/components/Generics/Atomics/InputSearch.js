import React from 'react';
import {  InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function InputSearch(props) {
    const {value, fullWidth, onChange, placeholder} = props
    return (
        <TextField
            label="Filtro"
            value={value}
            onChange={onChange}

            margin="dense"
            variant="outlined"
            fullWidth={fullWidth?fullWidth:true}
            placeholder={placeholder?placeholder:"Digite uma palavra-chave"}

            {...props}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default InputSearch;