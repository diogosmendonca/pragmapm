import React from 'react';
import MUIDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";


export default function Drawer(props){
    
    return(
        <MUIDrawer anchor="left" open={props.open} 
            onOpen={props.toggleDrawerHandler(true)} 
            onClose={props.toggleDrawerHandler(false)} >
            <Box width={250}>
                <List>
                    <ListItem key="PragmaPM">
                        <ListItemText primary="PragmaPM"/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key="Novo Projeto" onClick={props.toggleDrawerHandler(false)} component={Link} to="/projetos/novo">
                        <ListItemIcon><AddIcon /></ListItemIcon>
                        <ListItemText primary="Projetos" />
                    </ListItem>
                    <ListItem button key="Projetos" onClick={props.toggleDrawerHandler(false)} component={Link} to="/projetos">
                        <ListItemIcon><AccountTreeIcon /></ListItemIcon>
                        <ListItemText primary="Projetos" />
                    </ListItem>
                </List>
            </Box>
        </MUIDrawer>
    )

}