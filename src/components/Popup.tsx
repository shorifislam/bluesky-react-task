import React, { Children } from 'react'
import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import Controls from './controls/Controls';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogDesign:{
        padding:theme.spacing(2),
        position:'absolute',
        top:theme.spacing(5)
    },
    dialogTitle:{
        paddingRight:'0px'
    }
}))

export default function Popup(props) {

    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles();

  return (
    <Dialog open ={openPopup} maxWidth="md" classes={{paper : classes.dialogDesign}}>
        <DialogTitle className={classes.dialogTitle}>
            <div style={{display: 'flex'}}>
               <Typography variant='h5' component='div' style={{flexGrow:1}}>{title}</Typography>
               <Controls.ActionButton
               onClick={()=>{setOpenPopup(false)}}>
               <CloseIcon />
               </Controls.ActionButton>
            </div>
        </DialogTitle>
        <DialogContent dividers>
                {children}
        </DialogContent>
    </Dialog>
  )
}
