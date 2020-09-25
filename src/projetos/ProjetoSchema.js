import {string, object, number, setLocale, ref} from 'yup';
import { ptForm } from 'yup-locale-pt';

setLocale(ptForm)

const numericMsg = "O campo deve ser um número."
const menorQueUnTotais = "O campo deve ser menor ou igual a unidades totais"

export let projetoSchema = object().shape(
    {
        id: number(),
        nome: string().required().default(''),
        unidade: string().required().default(''),
        unidadeAtual: number().typeError(numericMsg).integer().min(0)
                .max(ref('unidadesTotais'), menorQueUnTotais).required().default(0),
        unidadesTotais: number().typeError(numericMsg).integer().min(0).required().default(0),
        idc: number().typeError(numericMsg).min(0).default(1),
        idp: number().typeError(numericMsg).min(0).default(1)
    }
)


export function getStatusProjeto(idc, idp){
    let margem = 0.2;

    let limiteInferior = 1 - margem;
    let limiteInferior2 = 1 - margem * 2;
    let status = 'ok';

    if(idc < limiteInferior || idp < limiteInferior){
        status = 'risco';
    }
    
    if(idc < limiteInferior && idp < limiteInferior){
        status = 'atrasado'
    }

    if(idc < limiteInferior2 || idp < limiteInferior2){
        status = 'atrasado';
    }

    return status;
}


