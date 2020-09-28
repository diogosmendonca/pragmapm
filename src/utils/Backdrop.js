import React from 'react';
import MUIBackdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function Backdrop(props) {
    const classes = useStyles();
    
    return (
        <MUIBackdrop className={classes.backdrop} open={props.open}>
            <CircularProgress color="inherit" />
        </MUIBackdrop>
    );
  }