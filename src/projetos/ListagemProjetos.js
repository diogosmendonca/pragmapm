import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {Link} from "react-router-dom";
import {fetchProjetos, deleteProjetoServer, setStatus} from './ProjetosSlice'

function TabelaProjetos(props){

    const projetos = useSelector(state => state.projetos.projetos)
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
            <td>{props.projeto.unidade} {props.projeto.unidadeAtual}/{props.projeto.unidadesTotais} IDC {props.projeto.idc.toFixed(1)} IDP {props.projeto.idp.toFixed(1)}</td>
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
    }, [status]);   

    return (
        <>
            <div>{msg}</div>
            <div id="lbl_titulo_pagina">Listagem de Projetos</div>
            <br/>
            <Link to='/projetos/novo'>
                <button id="Novo Projeto" name="btn_novo_projeto" >Novo Projeto</button>
            </Link>
            <br/><br/>
            <TabelaProjetos />
        </>
    );
}


export {ListagemProjetos};