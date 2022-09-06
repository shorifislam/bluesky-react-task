import { TextField } from '@material-ui/core';
import React from 'react'

export default function Input(props:any) {
    const {name, label, value, error=null, onChange,...other} = props;

  return (
    <TextField 
    variant='outlined'
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    {...other}
    {...(error && { error: true, helperText: error })}
    />


  )
}
