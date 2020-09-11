import React, {useState} from 'react';
import Projeto from '../../models/Projeto';

function FormProjeto(props) {
    
  const [projeto, setProjeto] = useState(new Projeto({}));

  function handleInputChange(e) {
    setProjeto(new Projeto({...projeto, [e.target.name]: e.target.value}));
  }

  function handleSubmit(event){
    alert('values: ' + JSON.stringify(projeto));
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} >
      <label>
        Nome:&nbsp;
        <input type="text" name="nome" value={projeto.nome} onChange={handleInputChange}  />
      </label><br/>
      <label>
        Unidade:&nbsp;
        <input type="text" name="unidade"  value={projeto.unidade} onChange={handleInputChange} />
      </label><br/>
      <label>
        Unidade Atual:&nbsp;
        <input type="text" name="unidadeAtual" value={projeto.unidadeAtual} onChange={handleInputChange} />
      </label><br/>
      <label>
        Unidades Totais:&nbsp;
        <input type="text" name="unidadesTotais" value={projeto.unidadesTotais} onChange={handleInputChange} />
      </label><br/>
      <label>
        IDC:&nbsp;
        <input type="text" name="idc" value={projeto.idc} onChange={handleInputChange} />
      </label><br/>
      <label>
        IDP:&nbsp;
        <input type="text" name="idp" value={projeto.idp} onChange={handleInputChange} />
      </label><br/>
      <input type="submit" value="Enviar" />
      <button>Cancelar</button>
    </form>
  );
    
}

export {FormProjeto};