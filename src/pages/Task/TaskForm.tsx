import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/useForm";
import { useUsers } from '../../contexts/UserContextApi';

const initialFieldValues = {
  name: '',
  user: '',
  isCompleted: false,
};

export default function TaskForm(props:any) {
  const {insertOrUpdate, taskToUpdate} = props;

  const validate = (fieldValues = values) => {
    let temp: any = {...errors}
    if('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'Project name is required';
    if('user' in fieldValues)
      temp.user = fieldValues.user ? '' : 'User is required';

    setErrors({ ...temp })

    if(fieldValues === values)
      return Object.values(temp).every(x => x === "")
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, true, validate);

    const users = useUsers();

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) 
      insertOrUpdate(values, resetForm)
  };

  useEffect(() => {
    if (taskToUpdate != null) 
      setValues({ ...taskToUpdate })
  }, [taskToUpdate]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
          <Controls.Input
            name="name"
            label="Project Name"
            value={values.name}
            onChange={handleInputChange} 
            error={errors.name}
          />
          <Controls.Select
            name="user"
            label="User"
            value={values.user}
            onChange={handleInputChange}
            options={users}
            error={errors.user}
          />
          <Controls.Checkbox
            name="isCompleted"
            label="Completed"
            value={values.isCompleted}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type="submit" text="Save" />
            <Controls.Button text="Reset" color="default" onClick={resetForm}/>
          </div>
        </Grid>
    </Form>
  );
}
