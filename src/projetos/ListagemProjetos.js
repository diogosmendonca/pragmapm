import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {fetchProjetos, deleteProjetoServer, setStatus, selectAllProjetos} from './ProjetosSlice'

function TabelaProjetos(props){

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
                <table id="projetos" border="1">
                    <tbody>
                        {projetos.map((projeto) => <LinhaProjeto key={projeto.id} projeto={projeto} onClickExcluirProjeto={handleClickExcluirProjeto} />)}
                    </tbody>
                </table>
            );
        case 'loading':
            return (<div>Carregando...</div>);
        case 'failed':
        default:
            return (<div>{error}</div>)
    }
}

function LinhaProjeto(props){
    return(
        <tr>
            <td><Link to={`/projetos/${props.projeto.id}`}><button>{props.projeto.nome}</button></Link></td>
            <td>{props.projeto.unidade} {props.projeto.unidadeAtual}/{props.projeto.unidadesTotais} IDC {props.projeto.idc.toFixed(2)} IDP {props.projeto.idp.toFixed(2)}</td>
            <td><button onClick={() => props.onClickExcluirProjeto(props.projeto.id)}>X</button></td>
        </tr>
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
            <div id="lbl_titulo_pagina">Listagem de Projetos</div>
            <br/>
            <Button id="Novo Projeto" name="btn_novo_projeto" 
                    variant="contained" color="primary" to="/projetos/novo"
                    component={Link} >Novo Projeto</Button>
            <br/><br/>
            <TabelaProjetos />
        </>
    );
}


export {ListagemProjetos};