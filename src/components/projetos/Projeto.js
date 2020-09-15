
const defaults = {
    id: 0,
    nome: '',
    unidade: '',
    unidadeAtual: 0,
    unidadesTotais: 0,
    idc: 0,
    idp: 0
}
export default class Projeto{

    constructor(obj){
        this.id = obj.id || defaults.id;
        this.nome = obj.nome || defaults.nome;
        this.unidade = obj.unidade || defaults.unidade;
        this.unidadeAtual = obj.unidadeAtual || defaults.unidadeAtual;
        this.unidadesTotais = obj.unidadesTotais || defaults.unidadesTotais;
        this.idc = obj.idc || defaults.idc;
        this.idp = obj.idp || defaults.idp;
    }

}