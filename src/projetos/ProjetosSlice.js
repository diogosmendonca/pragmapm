import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../utils'

const initialState = {
    status: 'not_loaded',
    projetos: [],
    error: null
};

export const fetchProjetos = createAsyncThunk('projetos/fetchProjetos', async () => {
    return await httpGet('http://localhost:3004/projetos');
});

export const deleteProjetoServer = createAsyncThunk('projetos/deleteProjetoServer', async (idProjeto) => {
    await httpDelete(`http://localhost:3004/projetos/${idProjeto}`);
    return idProjeto;
});

export const addProjetoServer = createAsyncThunk('projetos/addProjetoServer', async (projeto) => {
    return await httpPost('http://localhost:3004/projetos', projeto);
});

export const updateProjetoServer = createAsyncThunk('projetos/updateProjetoServer', async (projeto) => {
    return await httpPut(`http://localhost:3004/projetos/${projeto.id}`, projeto);
});

function fullfillProjetosReducer(projetosState, projetosFetched){
    projetosState.status = 'loaded';
    projetosState.projetos = projetosFetched;
}

function addProjetoReducer(state, projeto){
    let proxId = 1 + (state.projetos.length > 0 ? state.projetos.map(p => p.id).reduce((x, y) => Math.max(x,y)) : 0);
    state.projetos = state.projetos.concat([{...projeto, id: proxId}]);
}

function updateProjetoReducer(state, projeto){
    let index = state.projetos.map(p => p.id).indexOf(projeto.id);
    state.projetos.splice(index, 1, projeto);
}

function deleteProjetoReducer(state, idProjeto){
    state.projetos = state.projetos.filter((p) => p.id !== idProjeto);
}

export const projetosSlice = createSlice({
    name: 'projetos',
    initialState: initialState,
    reducers: {
        addProjeto: (state, action) => addProjetoReducer(state, action.payload),
        updateProjeto: (state, action) => updateProjetoReducer(state, action.payload),
        deleteProjeto: (state, action) => deleteProjetoReducer(state, action.payload),
        setStatus: (state, action) => {state.status = action.payload}
    },
    extraReducers: {
        [fetchProjetos.pending]: (state, action) => {state.status = 'loading'},
        [fetchProjetos.fulfilled]: (state, action) => {fullfillProjetosReducer(state, action.payload)},
        [fetchProjetos.rejected]: (state, action) => {state.status = 'failed'; state.error = 'Falha ao buscar projetos: ' + action.error.message},        
        [deleteProjetoServer.fulfilled]: (state, action) => {state.status = 'deleted'; deleteProjetoReducer(state, action.payload)},
        [deleteProjetoServer.rejected]: (state, action) => {state.status = 'failed'; state.error = 'Falha ao excluir projeto: ' + action.error.message},
        [addProjetoServer.fulfilled]: (state, action) => {state.status = 'saved'; addProjetoReducer(state, action.payload)},
        [addProjetoServer.rejected]: (state, action) => {state.status = 'failed'; state.error = 'Falha ao adicionar projeto: ' + action.error.message},        
        [updateProjetoServer.fulfilled]: (state, action) => {state.status = 'saved'; updateProjetoReducer(state, action.payload)},
        [updateProjetoServer.rejected]: (state, action) => {state.status = 'failed'; state.error = 'Falha ao atualizar projeto: ' + action.error.message},
    }
})

export const {addProjeto, updateProjeto, deleteProjeto, setStatus } = projetosSlice.actions

export default projetosSlice.reducer