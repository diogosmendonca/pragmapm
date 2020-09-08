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
            <td><button>Projeto X</button></td>
            <td>Semana 2/4 IDC 0.8 IDP 0.9</td>
            <td><button>X</button></td>
          </tr>
          <tr>
            <td><button>Projeto Y</button></td>
            <td>Mês 4/6 IDC 1.3 IDP 1.0</td>
            <td><button>X</button></td>
          </tr>
          <tr>
            <td><button>Projeto Z</button></td>
            <td>Semana 3/10 IDC 1.0 IDP 1.0</td>
            <td><button>X</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
