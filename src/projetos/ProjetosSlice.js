import Projeto from './Projeto';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

/*
const initialProjects =
    [new Projeto({id: 1, nome: 'Projeto X', unidade: 'Semana', unidadeAtual: 2, unidadesTotais: 4, idc: 0.8, idp: 0.9}),
    new Projeto({id: 2, nome: 'Projeto Y', unidade: 'Mês', unidadeAtual: 4, unidadesTotais: 6, idc: 1.3, idp: 1.0}),
    new Projeto({id: 3, nome: 'Projeto Z', unidade: 'Semana', unidadeAtual: 3, unidadesTotais: 10, idc: 1.0, idp: 1.0})];
*/
const initialProjects = [];


export const fetchProjetos = createAsyncThunk('projetos/fetchProjetos', async () => {
    try{
        let response = await fetch('http://localhost:3004/projetos');
        let projetos = await response.json();
        return projetos;
    }catch(error){        
        return [];
    }
});

function fullfillProjetosReducer(projetosState, projetosFetched){
    return projetosFetched;
}

function addProjetoReducer(projetos, projeto){
    let proxId = 1 + projetos.map(p => p.id).reduce((x, y) => Math.max(x,y));
    return projetos.concat([{...projeto, id: proxId}]);
}

function updateProjetoReducer(projetos, projeto){
    let index = projetos.map(p => p.id).indexOf(projeto.id);
    projetos.splice(index, 1, projeto);
    return projetos;
}

function deleteProjetoReducer(projetos, idProjeto){
    return projetos.filter((p) => p.id !== idProjeto);
}

export const projetosSlice = createSlice({
    name: 'projetos',
    initialState: initialProjects,
    reducers: {
        addProjeto: (state, action) => addProjetoReducer(state, action.payload),
        updateProjeto: (state, action) => updateProjetoReducer(state, action.payload),
        deleteProjeto: (state, action) => deleteProjetoReducer(state, action.payload)
    },
    extraReducers: {
        [fetchProjetos.fulfilled]: (state, action) => fullfillProjetosReducer(state, action.payload)
    }
})

export const {addProjeto, updateProjeto, deleteProjeto } = projetosSlice.actions

export default projetosSlice.reducer