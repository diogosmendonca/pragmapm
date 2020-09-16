import { configureStore } from '@reduxjs/toolkit'
import {projetosReducer} from './projetos/ProjetosReducer'

export const store = configureStore({
    reducer: {
      projetos: projetosReducer
    }
})