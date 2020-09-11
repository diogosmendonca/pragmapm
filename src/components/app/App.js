import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import {ListagemProjetos} from '../projetos/ListagemProjetos'
import {FormProjeto} from '../projetos/FormProjeto'
import Projeto from '../../models/Projeto';

function App() {

  const [projetos, setProjetos] = useState(
    [new Projeto({nome: 'Projeto X', unidade: 'Semana', unidadeAtual: 2, unidadesTotais: 4, idc: 0.8, idp: 0.9}),
     new Projeto({nome: 'Projeto Y', unidade: 'Mês', unidadeAtual: 4, unidadesTotais: 6, idc: 1.3, idp: 1.0}),
     new Projeto({nome: 'Projeto Z', unidade: 'Semana', unidadeAtual: 3, unidadesTotais: 10, idc: 1.0, idp: 1.0})]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projetos/novo">Novo Projeto</Link></li>
            <li><Link to="/projetos">Projetos</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/projetos/novo" component={() => <FormProjeto projetos={projetos} setProjetos={setProjetos} />}></Route>
          <Route path="/projetos/:nome" component={() => <FormProjeto projetos={projetos} setProjetos={setProjetos}/>}></Route>
          <Route path="/projetos" component={() => <ListagemProjetos projetos={projetos} setProjetos={setProjetos}/>}></Route>
          <Route path="/" component={() => <ListagemProjetos projetos={projetos} setProjetos={setProjetos}/>}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
