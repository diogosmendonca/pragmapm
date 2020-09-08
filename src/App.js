import React from 'react';
import './App.css';

function App() {
  return (
    <div>
      <div id="lbl_titulo_pagina">Listagem de Projetos</div>
      <br/>
      <button id="Novo Projeto" name="btn_novo_projeto">Novo Projeto</button>
      <br/><br/>
      <table id="projetos" border="1">
        <tbody>
          <tr>
            <td><a href="#">Projeto X</a></td>
            <td>Semana 2/4 IDC 0.8 IDP 0.9</td>
            <td><a href="#">X</a></td>
          </tr>
          <tr>
            <td><a href="#">Projeto Y</a></td>
            <td>Mês 4/6 IDC 1.3 IDP 1.0</td>
            <td><a href="#">X</a></td>
          </tr>
          <tr>
            <td><a href="#">Projeto Z</a></td>
            <td>Semana 3/10 IDC 1.0 IDP 1.0</td>
            <td><a href="#">X</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
