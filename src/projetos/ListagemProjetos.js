import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom";
import {fetchProjetos, deleteProjetoServer, setStatus, selectAllProjetos} from './ProjetosSlice'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAlt from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentDissatisfiedOutlined';
import Divider from '@material-ui/core/Divider';
import {getStatusProjeto} from './ProjetoSchema';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { yellow, green, red, grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Skeleton from '@material-ui/lab/Skeleton';


function ListaProjetos(props){

    const projetos = useSelector(selectAllProjetos)
    const status = useSelector(state => state.projetos.status)    
    const dispatch = useDispatch()

    function handleClickExcluirProjeto(id, nome){
        props.setExcluirId(id);
        props.setExcluirNome(nome);
    }

    useEffect(() => {
        if (status === 'not_loaded') {
            dispatch(fetchProjetos())
        } 
    }, [status, dispatch])

    switch(status){
        case 'loaded': case 'saved':
            return(
                <List id="projetos">
                    <Divider />
                    {projetos.map((projeto) => <ItemProjeto key={projeto.id} projeto={projeto} 
                            onClickExcluirProjeto={handleClickExcluirProjeto} />)}
                </List>
            );
        case 'loading':
            return (
                <List id="projetos">
                    <Divider />
                    {[1,2,3,4,5].map((item) => <ItemProjeto loading key={item} />)}
                </List>
                );
        case 'failed':
        default:
            return (<div></div>)
    }
}

function getAvatar(status){
    switch(status){
        case 'atrasado':
            return(
                <Avatar style={{backgroundColor: red[400]}} > 
                    <SentimentDissatisfiedOutlinedIcon style={{color: grey[100]}}/>
                </Avatar>
            );
        case 'risco':
            return(
                <Avatar style={{backgroundColor: yellow[400]}} > 
                    <SentimentSatisfiedIcon style={{color: grey[900]}}/>
                </Avatar>
            );
        case 'ok': default:
            return(
                <Avatar style={{backgroundColor: green[400]}} > 
                    <SentimentSatisfiedAlt style={{color: grey[900]}}/>
                </Avatar>
            );
    }
}

function ItemProjeto(props){
    let listItemProps = props.loading ? 
    {
        divider: true    
    } :
    {
        divider: true,
        button: true,
        id: props.projeto.id,
        component: Link,
        to: `/projetos/${props.projeto.id}`
    };

    return(
        <ListItem {...listItemProps} >
            <ListItemAvatar>
                { props.loading ? <Skeleton variant="circle" width={40} height={40} /> : getAvatar(getStatusProjeto(props.projeto.idc, props.projeto.idp))}
            </ListItemAvatar>
            { props.loading ? 
            <Box pt={0.5} flexGrow={1}>
                <Skeleton variant="text" width={100} height={20} />
                <Skeleton variant="text" width={180} height={20} />
            </Box>
            : <ListItemText
                primary={props.projeto.nome}
                secondary={`${props.projeto.unidade} ${props.projeto.unidadeAtual}/${props.projeto.unidadesTotais}
                 IDC ${props.projeto.idc.toFixed(2)} IDP ${props.projeto.idp.toFixed(2)}`}
            />
            }
            <ListItemSecondaryAction>
                { props.loading ? <Skeleton variant="circle" width={20} height={20} />
                :<IconButton edge="end" aria-label="delete" 
                    onClick={() => props.onClickExcluirProjeto(props.projeto.id, props.projeto.nome)}>
                    <DeleteIcon />
                </IconButton>
                }
            </ListItemSecondaryAction>
        </ListItem>
    );
}

function ConfirmarExclusaoProjetoDialog(props) {
    
    return (
      <div>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Excluir Projeto"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirma a exclusão do projeto {props.nome}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={props.handleConfirmar} color="primary" autoFocus>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

function ListagemProjetos (props){
    const status = useSelector(state => state.projetos.status)
    const dispatch = useDispatch()
    const [excluirId, setExcluirId] = useState(0);
    const [excluirNome, setExcluirNome] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    
    useEffect(() => {
        if (status === 'saved' || status === 'deleted'){
            dispatch(setStatus('loaded'));
        }
    }, [status, dispatch]);   

    useEffect(() => {
        if (excluirId !== 0){
            setOpenConfirmDialog(true);
        }
    }, [excluirId]);   

    function handleConfirmarExclusao(){
        //dispatch
        dispatch(deleteProjetoServer(excluirId))
        //close
        setOpenConfirmDialog(false);
    }

    function handleCancelarExclusao(){
        setExcluirId(0);
        setOpenConfirmDialog(false);
    }
    

    return (
        <>            
            <Box display="flex" m={2}>
                <Box flexGrow={1} m={1}><Typography variant="h5"  id="lbl_titulo_pagina">Projetos</Typography></Box>
                <Box >
                    <Button id="Novo Projeto" name="btn_novo_projeto" 
                        variant="contained" color="primary" to="/projetos/novo"
                        component={Link} startIcon={<AddIcon />}>Novo</Button>
                </Box>
                </Box>
            <ListaProjetos setExcluirNome={setExcluirNome} setExcluirId={setExcluirId}  />
            <ConfirmarExclusaoProjetoDialog open={openConfirmDialog} nome={excluirNome} 
                    handleConfirmar={handleConfirmarExclusao}
                    handleClose={handleCancelarExclusao}/>
        </>
    );
}


export {ListagemProjetos};