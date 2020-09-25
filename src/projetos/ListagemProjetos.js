import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
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


function ListaProjetos(props){

    const projetos = useSelector(selectAllProjetos)
    const status = useSelector(state => state.projetos.status)
    const error = useSelector(state => state.projetos.error)
    const dispatch = useDispatch()

    function handleClickExcluirProjeto(id){
        dispatch(deleteProjetoServer(id))
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
                    {projetos.map((projeto) => <ItemProjeto key={projeto.id} projeto={projeto} onClickExcluirProjeto={handleClickExcluirProjeto} />)}
                </List>
            );
        case 'loading':
            return (<div>Carregando...</div>);
        case 'failed':
        default:
            return (<div>{error}</div>)
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
    return(
        <ListItem divider button id={props.projeto.id} component={Link} to={`/projetos/${props.projeto.id}`} >
            <ListItemAvatar>
                {getAvatar(getStatusProjeto(props.projeto.idc, props.projeto.idp))}
            </ListItemAvatar>
            <ListItemText
                primary={props.projeto.nome}
                secondary={`${props.projeto.unidade} ${props.projeto.unidadeAtual}/${props.projeto.unidadesTotais} IDC ${props.projeto.idc.toFixed(2)} IDP ${props.projeto.idp.toFixed(2)}`}
            />
            <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => props.onClickExcluirProjeto(props.projeto.id)}>
                <DeleteIcon />
            </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

function ListagemProjetos (props){
    const status = useSelector(state => state.projetos.status)
    const dispatch = useDispatch()
    var [msg, setMsg] = useState('');
    
    useEffect(() => {
        if (status === 'saved'){
            setMsg('Projeto salvo com sucesso');
            dispatch(setStatus('loaded'));
        }else if (status === 'deleted'){
            setMsg('Projeto excluído com sucesso');
            dispatch(setStatus('loaded'));
        }
    }, [status, dispatch]);   

    return (
        <>
            <div>{msg}</div>
            <Box display="flex" m={2}>
                <Box flexGrow={1} m={1}><Typography variant="h5"  id="lbl_titulo_pagina">Projetos</Typography></Box>
                <Box >
                    <Button id="Novo Projeto" name="btn_novo_projeto" 
                        variant="contained" color="primary" to="/projetos/novo"
                        component={Link} startIcon={<AddIcon />}>Novo</Button>
                </Box>
                </Box>
            <ListaProjetos />
            
        </>
    );
}


export {ListagemProjetos};