import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {projetoSchema} from './ProjetoSchema';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from "react-hook-form";
import {addProjetoServer, updateProjetoServer, selectProjetosById} from './ProjetosSlice';

function FormProjeto(props) {
  
  const status = useSelector(state => state.projetos.status)
  const error = useSelector(state => state.projetos.error)
  const dispatch = useDispatch()
  let { id } = useParams();
  const projetoFound = useSelector(state => selectProjetosById(state, id))
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(projetoSchema)
  });

  id = parseInt(id);

  const [projetoOnLoad] = useState(
    id ? projetoFound ?? projetoSchema.cast({}): projetoSchema.cast({}));
  
  const [actionType, ] = useState(
    id ? projetoFound 
            ? 'projetos/updateProjetoServer'
            : 'projetos/addProjetoServer'
         : 'projetos/addProjetoServer');
  const history = useHistory();

  function onSubmit(projeto){
    if(actionType === 'projetos/addProjetoServer'){
      dispatch(addProjetoServer(projeto));
    }else if(actionType === 'projetos/updateProjetoServer'){
      dispatch(updateProjetoServer({...projeto, id: projetoFound.id}))
    }
  } 

  useEffect(() =>  {
    if(status === 'saved'){
      history.push('/projetos');
    }
  }, [history, status]);

  /*
  useEffect(() =>  {
    document.title = `Projeto: ${projeto.nome}`;
    return () => {document.title = 'PragmaPM'}
  }, [projeto.nome]);
  */

  return (
    <>
    <div>{error}</div>
    <form onSubmit={handleSubmit(onSubmit)} noValidate={true} >
      <label>
        Nome:&nbsp;
        <input type="text" name="nome" defaultValue={projetoOnLoad.nome} ref={register}  />
        <span>{errors.nome?.message}</span>
      </label><br/>
      <label>
        Unidade:&nbsp;
        <select name="unidade" defaultValue={projetoOnLoad.unidade} ref={register}>
          <option value="Semana">Semana</option>
          <option value="Mês">Mês</option>
        </select>
        <span>{errors.unidade?.message}</span>
      </label><br/>
      <label>
        Unidade Atual:&nbsp;
        <input type="number" name="unidadeAtual" min="0" defaultValue={projetoOnLoad.unidadeAtual} ref={register} />
        <span>{errors.unidadeAtual?.message}</span>
      </label><br/>
      <label>
        Unidades Totais:&nbsp;
        <input type="number" name="unidadesTotais" min="0" defaultValue={projetoOnLoad.unidadesTotais} ref={register} />
        <span>{errors.unidadesTotais?.message}</span>
      </label><br/>
      <label>
        IDC:&nbsp;
        <input type="number" step="0.01" name="idc" min="0" defaultValue={projetoOnLoad.idc} ref={register} />
        <span>{errors.idc?.message}</span>
      </label><br/>
      <label>
        IDP:&nbsp;
        <input type="number" step="0.01" name="idp" min="0" defaultValue={projetoOnLoad.idp} ref={register} />
        <span>{errors.idp?.message}</span>
      </label><br/>
      <input type="submit" value="Enviar" />
      <input type="button" value="Cancelar" onClick={()=>history.goBack()}/>
    </form>
  </>
  );
    
}

export {FormProjeto};