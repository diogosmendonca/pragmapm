import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
    status: 'not_loaded',
    projetos: [],
    error: null
};

export const fetchProjetos = createAsyncThunk('projetos/fetchProjetos', async () => {
    return await (await fetch('http://localhost:3004/projetos')).json();
});

export const deleteProjetoServer = createAsyncThunk('projetos/deleteProjetoServer', async (idProjeto) => {
    let response = await fetch('http://localhost:3004/projetos/' + idProjeto, {method: 'DELETE'});
    if(response.ok){
        return idProjeto;
    }else{
        throw new Error("Erro ao excluir o projeto");
    }
});

export const addProjetoServer = createAsyncThunk('projetos/addProjetoServer', async (projeto) => {
    let response = await fetch('http://localhost:3004/projetos' , 
                                {
                                    method: 'POST', 
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                    },
                                    body: JSON.stringify(projeto)
                                });
    if(response.ok){
        return projeto;
    }else{
        throw new Error("Erro ao incluir o projeto");
    }
});

export const updateProjetoServer = createAsyncThunk('projetos/updateProjetoServer', async (projeto) => {
    let response = await fetch('http://localhost:3004/projetos/' + projeto.id , 
                                {
                                    method: 'PUT', 
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                    },
                                    body: JSON.stringify(projeto)
                                });
    if(response.ok){
        return projeto;
    }else{
        throw new Error("Erro ao atualizar o projeto");
    }
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
        deleteProjeto: (state, action) => deleteProjetoReducer(state, action.payload)
    },
    extraReducers: {
        [fetchProjetos.pending]: (state, action) => {state.status = 'loading'},
        [fetchProjetos.fulfilled]: (state, action) => {fullfillProjetosReducer(state, action.payload)},
        [fetchProjetos.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},        
        [deleteProjetoServer.fulfilled]: (state, action) => {deleteProjetoReducer(state, action.payload)},
        [addProjetoServer.fulfilled]: (state, action) => {addProjetoReducer(state, action.payload)},
        [updateProjetoServer.fulfilled]: (state, action) => {updateProjetoReducer(state, action.payload)},
    }
})

export const {addProjeto, updateProjeto, deleteProjeto } = projetosSlice.actions

export default projetosSlice.reducer