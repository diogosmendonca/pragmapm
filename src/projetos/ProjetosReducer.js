import Projeto from './Projeto';

export const initialProjects =
    [new Projeto({id: 1, nome: 'Projeto X', unidade: 'Semana', unidadeAtual: 2, unidadesTotais: 4, idc: 0.8, idp: 0.9}),
    new Projeto({id: 2, nome: 'Projeto Y', unidade: 'Mês', unidadeAtual: 4, unidadesTotais: 6, idc: 1.3, idp: 1.0}),
    new Projeto({id: 3, nome: 'Projeto Z', unidade: 'Semana', unidadeAtual: 3, unidadesTotais: 10, idc: 1.0, idp: 1.0})];
 

function addProjetoReducer(projetos, projeto){
    let proxId = 1 + projetos.map(p => p.id).reduce((x, y) => Math.max(x,y));
    return projetos.concat([{...projeto, id: proxId}]);
}

function updateProjetoReducer(projetos, projeto){
    let index = projetos.map(p => p.id).indexOf(projeto.id);
    let projetosUpdated = projetos.slice();
    projetosUpdated.splice(index, 1, projeto);
    return projetosUpdated;
}

function deleteProjetoReducer(projetos, idProjeto){
    return projetos.filter((p) => p.id !== idProjeto);
}

const reducerMap = {
    'add_project': addProjetoReducer,
    'update_project': updateProjetoReducer,
    'delete_project': deleteProjetoReducer
}

export function projetosReducer(state = initialProjects, action){
    const reducer = reducerMap[action.type];
    if(reducer){
        return reducer(state, action.payload)
    }else{
        return state;
    }
}
