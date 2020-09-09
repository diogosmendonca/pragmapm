import React, {Component} from 'react';
import Projeto from '../../models/Projeto';

const TabelaProjetos = (props) => {
    return(
        <table id="projetos" border="1">
            <tbody>
                {props.projetos.map((projeto) => <LinhaProjeto projeto={projeto} onClickExcluirProjeto={props.onClickExcluirProjeto} />)}
            </tbody>
        </table>
    );
}

const LinhaProjeto = (props) => {
    return(
        <tr>
            <td><button>{props.projeto.nome}</button></td>
            <td>{props.projeto.unidade} {props.projeto.unidadeAtual}/{props.projeto.unidadesTotais} IDC {props.projeto.idc.toFixed(1)} IDP {props.projeto.idp.toFixed(1)}</td>
            <td><button onClick={() => props.onClickExcluirProjeto(props.projeto.nome)}>X</button></td>
        </tr>
    );
}


class ListagemProjetos extends Component {

    constructor(props){
        super(props);
        this.state = {
            projetos: [
                new Projeto('Projeto X', 'Semana', 2, 4, 0.8, 0.9),
                new Projeto('Projeto Y', 'Mês', 4, 6, 1.3, 1.0),
                new Projeto('Projeto Z', 'Semana', 3, 10, 1.0, 1.0)
            ]
        }
        this.handleClickExcluirProjeto = this.handleClickExcluirProjeto.bind(this);
    }

    handleClickNovoProjeto(){
        let projetos = this.state.projetos.slice();
        projetos.push(new Projeto('Novo Projeto', 'Semana', 3, 10, 1.0, 1.0));
        this.setState({projetos: projetos});
    }
     
    handleClickExcluirProjeto(nome){
        let projetos = this.state.projetos.slice();
        projetos = projetos.filter((value) => value.nome !== nome);
        this.setState({projetos: projetos});
    }

    render(){
        return (
            <>
                <div id="lbl_titulo_pagina">Listagem de Projetos</div>
                <br/>
                <button id="Novo Projeto" name="btn_novo_projeto" onClick={() => this.handleClickNovoProjeto()}>Novo Projeto</button>
                <br/><br/>
                <TabelaProjetos projetos={this.state.projetos} onClickExcluirProjeto={this.handleClickExcluirProjeto} />
            </>
        );
    }
}

export {ListagemProjetos};