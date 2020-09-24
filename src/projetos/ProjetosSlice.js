import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {httpDelete, httpGet, httpPut, httpPost} from '../utils'
import {baseUrl} from '../baseUrl';


const projetosAdapter = createEntityAdapter();

const initialState = projetosAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchProjetos = createAsyncThunk('projetos/fetchProjetos', async () => {
    return await httpGet(`${baseUrl}/projetos`);
});

export const deleteProjetoServer = createAsyncThunk('projetos/deleteProjetoServer', async (idProjeto) => {
    await httpDelete(`${baseUrl}/projetos/${idProjeto}`);
    return idProjeto;
});

export const addProjetoServer = createAsyncThunk('projetos/addProjetoServer', async (projeto) => {
    return await httpPost(`${baseUrl}/projetos`, projeto);
});

export const updateProjetoServer = createAsyncThunk('projetos/updateProjetoServer', async (projeto) => {
    return await httpPut(`${baseUrl}/projetos/${projeto.id}`, projeto);
});

export const projetosSlice = createSlice({
    name: 'projetos',
    initialState: initialState,
    reducers: {
        setStatus: (state, action) => {state.status = action.payload}
    },
    extraReducers: {
        [fetchProjetos.pending]: (state, action) => {state.status = 'loading'},
        [fetchProjetos.fulfilled]: (state, action) => {state.status = 'loaded'; projetosAdapter.setAll(state, action.payload);},
        [fetchProjetos.rejected]: (state, action) => {state.status = 'failed'; state.error = 'Falha ao buscar projetos: ' + action.error.message},        
        [deleteProjetoServer.fulfilled]: (state, action) => {state.status = 'deleted'; projetosAdapter.removeOne(state, action.payload);},
        [deleteProjetoServer.rejected]: (state, action) => {state.status = 'failed'; state.error = 'Falha ao excluir projeto: ' + action.error.message},
        [addProjetoServer.fulfilled]: (state, action) => {state.status = 'saved'; projetosAdapter.addOne(state, action.payload);},
        [addProjetoServer.rejected]: (state, action) => {state.status = 'failed'; state.error = 'Falha ao adicionar projeto: ' + action.error.message},        
        [updateProjetoServer.fulfilled]: (state, action) => {state.status = 'saved'; projetosAdapter.upsertOne(state, action.payload);},
        [updateProjetoServer.rejected]: (state, action) => {state.status = 'failed'; state.error = 'Falha ao atualizar projeto: ' + action.error.message},
    }
})

export const { setStatus } = projetosSlice.actions

export default projetosSlice.reducer

export const {
    selectAll: selectAllProjetos,
    selectById: selectProjetosById,
    selectIds: selectProjetosIds
} = projetosAdapter.getSelectors(state => state.projetos)
    