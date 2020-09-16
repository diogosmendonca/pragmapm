
export default function Projeto(obj){

    return {
        id: obj.id || 0,
        nome: obj.nome || '',
        unidade: obj.unidade || '',
        unidadeAtual: obj.unidadeAtual || 0,
        unidadesTotais: obj.unidadesTotais || 0,
        idc: obj.idc || 0,
        idp: obj.idp || 0
    };

}