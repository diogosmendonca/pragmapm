import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from '@material-ui/core/Typography';
import MUIAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LightIcon from '@material-ui/icons/Brightness7';
import DarkIcon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

export default function AppBar(props){
    const classes = useStyles();

    const icon = props.darkState ? <LightIcon />: <DarkIcon />;

    return(
        <div className={classes.root}>
          <MUIAppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6">PragmaPM</Typography>
              <Tooltip title="Trocar modo claro/escuro">
                <IconButton edge="start" className={classes.menuButton} onClick={props.handleThemeChange} color="inherit" aria-label="trocar modo claro/escuro">
                    {icon}
                </IconButton>
              </Tooltip>
            </Toolbar>
          </MUIAppBar>
       </div>
    );

}