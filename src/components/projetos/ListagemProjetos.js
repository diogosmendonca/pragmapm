import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Projeto from '../../models/Projeto';


function TabelaProjetos(props){
    return(
        <table id="projetos" border="1">
            <tbody>
                {props.projetos.map((projeto) => <LinhaProjeto projeto={projeto} onClickExcluirProjeto={props.onClickExcluirProjeto} />)}
            </tbody>
        </table>
    );
}

function LinhaProjeto(props){
    return(
        <tr>
            <td><button>{props.projeto.nome}</button></td>
            <td>{props.projeto.unidade} {props.projeto.unidadeAtual}/{props.projeto.unidadesTotais} IDC {props.projeto.idc.toFixed(1)} IDP {props.projeto.idp.toFixed(1)}</td>
            <td><button onClick={() => props.onClickExcluirProjeto(props.projeto.nome)}>X</button></td>
        </tr>
    );
}

function ListagemProjetos (props){

    const [projetos, setProjetos] = useState(
            [new Projeto({nome: 'Projeto X', unidade: 'Semana', unidadeAtual: 2, unidadesTotais: 4, idc: 0.8, idp: 0.9}),
             new Projeto({nome: 'Projeto Y', unidade: 'Mês', unidadeAtual: 4, unidadesTotais: 6, idc: 1.3, idp: 1.0}),
             new Projeto({nome: 'Projeto Z', unidade: 'Semana', unidadeAtual: 3, unidadesTotais: 10, idc: 1.0, idp: 1.0})]);
    
    function handleClickExcluirProjeto(nome){
        setProjetos(projetos.filter((value) => value.nome !== nome));
    }

    return (
        <>
            <div id="lbl_titulo_pagina">Listagem de Projetos</div>
            <br/>
            <Link to='/projetos/novo'>
                <button id="Novo Projeto" name="btn_novo_projeto" >Novo Projeto</button>
            </Link>
            <br/><br/>
            <TabelaProjetos projetos={projetos}
                            onClickExcluirProjeto={handleClickExcluirProjeto} />
        </>
    );
}

export {ListagemProjetos};