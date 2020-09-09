import React, {Component} from 'react';
import Projeto from '../../models/Projeto';

class FormProjeto extends Component {
    
    constructor(props){
        super(props);
        this.state = new Projeto('', '', 0, 0, 0.0, 0.0);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event){
        alert('values: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit} >
          <label>
            Nome:&nbsp;
            <input type="text" name="nome" value={this.state.nome} onChange={this.handleInputChange}  />
          </label><br/>
          <label>
            Unidade:&nbsp;
            <input type="text" name="unidade"  value={this.state.unidade} onChange={this.handleInputChange} />
          </label><br/>
          <label>
            Unidade Atual:&nbsp;
            <input type="text" name="unidadeAtual" value={this.state.unidadeAtual} onChange={this.handleInputChange} />
          </label><br/>
          <label>
            Unidades Totais:&nbsp;
            <input type="text" name="unidadesTotais" value={this.state.unidadesTotais} onChange={this.handleInputChange} />
          </label><br/>
          <label>
            IDC:&nbsp;
            <input type="text" name="idc" value={this.state.idc} onChange={this.handleInputChange} />
          </label><br/>
          <label>
            IDP:&nbsp;
            <input type="text" name="idp" value={this.state.idp} onChange={this.handleInputChange} />
          </label><br/>
          <input type="submit" value="Enviar" />
          <button>Cancelar</button>
        </form>
      );
    }
}

export {FormProjeto};