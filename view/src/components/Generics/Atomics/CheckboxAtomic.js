import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import './style/CheckboxAtomic.css';


function CheckboxAtomic(props) {
    return (
        <FormControlLabel
            style={props.style}
            control={
                <Checkbox
                    color="default"
                    checked={props.checked}
                    onChange={props.onChange}
                    id={props.id}
                    className='CheckboxAtomic'
                    name={props.label}
                    {...props} />
            }
            label={props.label}
        />
    )
}

export default CheckboxAtomic;