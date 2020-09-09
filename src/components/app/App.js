import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import {ListagemProjetos} from '../projetos/ListagemProjetos'
import {FormProjeto} from '../projetos/FormProjeto'

function App() {
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
          <Route path="/projetos/novo"><FormProjeto /></Route>
          <Route path="/projetos"><ListagemProjetos/></Route>
          <Route path="/"><ListagemProjetos/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
