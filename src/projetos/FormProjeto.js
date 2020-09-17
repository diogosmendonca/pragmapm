import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import Projeto from './Projeto';
import {addProjetoServer, updateProjetoServer} from './ProjetosSlice';

function FormProjeto(props) {
  
  const projetos = useSelector(state => state.projetos.projetos)
  const dispatch = useDispatch()
  let { id } = useParams();
  id = parseInt(id);

  const [projeto, setProjeto] = useState(
    id ? 
        projetos.filter((p) => p.id === id)[0] ?? new Projeto({})
       : new Projeto({}));
  
  const [actionType, ] = useState(
    id ? 
      projetos.filter((p) => p.id === id)[0] 
            ? 'projetos/updateProjetoServer'
            : 'projetos/addProjetoServer'
         : 'projetos/addProjetoServer');
  const history = useHistory();

  
  function handleInputChange(e) {
    setProjeto(new Projeto({...projeto, [e.target.name]: e.target.value}));
  }

  function handleSubmit(event){
    event.preventDefault();
    if(actionType === 'projetos/addProjetoServer'){
      dispatch(addProjetoServer(projeto));
    }else if(actionType === 'projetos/updateProjetoServer'){
      dispatch(updateProjetoServer(projeto))
    }
    history.push('/projetos');
  }

  useEffect(() =>  {
    document.title = `Projeto: ${projeto.nome}`;
    return () => {document.title = 'PragmaPM'}
  }, [projeto.nome]);

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
      <input type="button" value="Cancelar" onClick={()=>history.goBack()}/>
    </form>
  );
    
}

export {FormProjeto};