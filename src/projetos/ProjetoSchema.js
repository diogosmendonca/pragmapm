import {string, object, number, setLocale, ref} from 'yup';
import { ptForm } from 'yup-locale-pt';

setLocale(ptForm)

const numericMsg = "O campo deve ser um número."
const menorQueUnTotais = "O campo deve ser menor ou igual a unidades totais"

export let projetoSchema = object().shape(
    {
        id: number(),
        nome: string().required(),
        unidade: string().required(),
        unidadeAtual: number().typeError(numericMsg).integer().min(0)
                .max(ref('unidadesTotais'), menorQueUnTotais).required().default(0),
        unidadesTotais: number().typeError(numericMsg).integer().min(0).required().default(0),
        idc: number().typeError(numericMsg).min(0).default(0),
        idp: number().typeError(numericMsg).min(0).default(0)
    }
)

