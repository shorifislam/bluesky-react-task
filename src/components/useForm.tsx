import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {useState} from 'react'


export function useForm(initialFieldValues:any, validateOnChange=false, validate) {


    const [values, setValues] = useState(initialFieldValues); 
    const [errors, setErrors] = useState<any>({}); 

    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setValues({
          ...values,
          [name]:value
        })

        if(validateOnChange)
        validate({[name]:value})
    
      }

      const resetForm = () =>{
        setValues(initialFieldValues);
        setErrors({});
      }

  return {
    values,
    setValues,  
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }
}

const useStyles = makeStyles(theme => ({
    root:{
      '& .MuiFormControl-root': {
        width:'80%',
        margin: '8px'
      }
  
    }
  }))
  
export function Form(props:any) {

  const classes = useStyles();

  const {children, ...other} = props;

    return (
    <form className={classes.root} autoComplete="off" {...other}>
        {props.children}
    </form>
  )
}
