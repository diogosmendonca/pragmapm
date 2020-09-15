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
import Projeto from '../../models/Projeto';

const initialProjects =
    [new Projeto({id: 1, nome: 'Projeto X', unidade: 'Semana', unidadeAtual: 2, unidadesTotais: 4, idc: 0.8, idp: 0.9}),
     new Projeto({id: 2, nome: 'Projeto Y', unidade: 'Mês', unidadeAtual: 4, unidadesTotais: 6, idc: 1.3, idp: 1.0}),
     new Projeto({id: 3, nome: 'Projeto Z', unidade: 'Semana', unidadeAtual: 3, unidadesTotais: 10, idc: 1.0, idp: 1.0})];

function projetosReducer(projetos /*state*/, action ){
  switch(action.type){
    case 'add_project': /* payload: projeto */
      let proxId = 1 + projetos.map(p => p.id).reduce((x, y) => Math.max(x,y));
      return projetos.concat([{...action.payload, id: proxId}]);
    case 'update_project': /* payload: projeto */
      let index = projetos.map(p => p.id).indexOf(action.payload.id);
      let projetosUpdated = projetos.slice();
      projetosUpdated.splice(index, 1, action.payload);
      return projetosUpdated;
    case 'delete_project': /* payload: id */
      return projetos.filter((p) => p.id !== action.payload);
    default:
      throw new Error();
  }
}

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
