
import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Snackbar(props){

    //close do snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setOpenSnackbar(false);
    };

    return (<MuiSnackbar open={props.openSnackbar} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={props.severity}>
              {props.msg}
              </Alert>
            </MuiSnackbar>);
}