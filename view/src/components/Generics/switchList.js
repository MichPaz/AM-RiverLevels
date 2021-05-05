import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

export default function SwitchLabels(props) {
  const { items, setEnables, enables, row } = props

  const handleChange = (event) => {
    setEnables({ ...enables, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row={row}>
      {items.map(item => (
        <FormControlLabel
          key={item.value}
          control={
            <Switch
              checked={enables[item.value]}
              onChange={handleChange}
              name={item.value}
              color="primary"
            />
          }
          label={item.label}
        />
      ))}

    </FormGroup>
  );
}