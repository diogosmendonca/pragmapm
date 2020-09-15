import React, {useReducer} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import {ListagemProjetos} from '../projetos/ListagemProjetos'
import {FormProjeto} from '../projetos/FormProjeto'
import projetosReducer from '../projetos/ProjetosReducer';

function App() {

  const [projetos, dispatch] = useReducer(projetosReducer, initialProjects);

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
          <Route path="/projetos/novo" component={() => <FormProjeto projetos={projetos} dispatch={dispatch} />}></Route>
          <Route path="/projetos/:id" component={() => <FormProjeto projetos={projetos} dispatch={dispatch}/>}></Route>
          <Route path="/projetos" component={() => <ListagemProjetos projetos={projetos} dispatch={dispatch}/>}></Route>
          <Route path="/" component={() => <ListagemProjetos projetos={projetos} dispatch={dispatch}/>}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
