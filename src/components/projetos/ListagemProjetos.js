import React from 'react';
import {Link} from "react-router-dom";

function TabelaProjetos(props){
    return(
        <table id="projetos" border="1">
            <tbody>
                {props.projetos.map((projeto) => <LinhaProjeto key={projeto.id} projeto={projeto} onClickExcluirProjeto={props.onClickExcluirProjeto} />)}
            </tbody>
        </table>
    );
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
    
    function handleClickExcluirProjeto(id){
        props.dispatch({type: 'delete_project', payload: id})
    }

    return (
        <>
            <div id="lbl_titulo_pagina">Listagem de Projetos</div>
            <br/>
            <Link to='/projetos/novo'>
                <button id="Novo Projeto" name="btn_novo_projeto" >Novo Projeto</button>
            </Link>
            <br/><br/>
            <TabelaProjetos projetos={props.projetos}
                            onClickExcluirProjeto={handleClickExcluirProjeto} />
        </>
    );
}

export {ListagemProjetos};