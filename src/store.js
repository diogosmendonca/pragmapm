import { configureStore } from '@reduxjs/toolkit'
import projetosReducer from './projetos/ProjetosSlice'

export const store = configureStore({
    reducer: {
      projetos: projetosReducer
    }
})