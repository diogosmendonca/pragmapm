import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {projetoSchema} from './ProjetoSchema';
import { yupResolver } from '@hookform/resolvers';
import { useForm, Controller } from "react-hook-form";
import {addProjetoServer, updateProjetoServer, selectProjetosById} from './ProjetosSlice';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 250,
      align: 'center'
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    textAlign: 'left'
  },
}));

function FormProjeto(props) {
  const classes = useStyles();
  const status = useSelector(state => state.projetos.status)
  const error = useSelector(state => state.projetos.error)
  const dispatch = useDispatch()
  let { id } = useParams();
  const projetoFound = useSelector(state => selectProjetosById(state, id))
  const { register, handleSubmit, errors, control} = useForm({
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

  const lblTitulo = actionType === 'projetos/updateProjetoServer'? "Alterar" : "Novo";

  return (
    <>
    <div>{error}</div>
    <Box m={1}><Typography variant="h5" id="lbl_titulo_pagina">{lblTitulo} Projeto</Typography></Box>
    <Box align="center">
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)} noValidate={true} autoComplete="off" >
      <TextField inputRef={register} name="nome" label="Nome" required 
        defaultValue={projetoOnLoad.nome} helperText={errors.nome?.message} error={errors.nome?.message ? true: false} />
      <br/>
      <FormControl 
            className={classes.formControl}
            error={Boolean(errors.unidade)}>
        <InputLabel id="demo-simple-select-label">Unidade</InputLabel>
        <Controller
          as={
            <Select  >
              <MenuItem value=""></MenuItem>
              <MenuItem value="Semana">Semana</MenuItem>
              <MenuItem value="Mês">Mês</MenuItem>
            </Select>
          }
          name="unidade" 
          control={control}
          defaultValue={projetoOnLoad.unidade}
        />
        <FormHelperText>
          {errors.unidade?.message}
        </FormHelperText>
      </FormControl>
      <br/>
      <Controller type="number" min="0" as={TextField} name="unidadeAtual" 
        label="Unidade atual" control={control} required
        defaultValue={projetoOnLoad.unidadeAtual} helperText={errors.unidadeAtual?.message} 
        error={errors.unidadeAtual?.message ? true: false} />
      <br/>
      <TextField type="number" min="0" required inputRef={register} 
        name="unidadesTotais" label="Unidades Totais" 
        defaultValue={projetoOnLoad.unidadesTotais} helperText={errors.unidadesTotais?.message} 
        error={errors.unidadesTotais?.message ? true: false} />
      <br/>
      <TextField type="number" step="0.01" name="idc" min="0" required inputRef={register} 
         label="IDC" defaultValue={projetoOnLoad.idc} helperText={errors.idc?.message} 
        error={errors.idc?.message ? true: false} />
      <br/>
      <TextField type="number" step="0.01" name="idp" min="0" required inputRef={register} 
        label="IDP" defaultValue={projetoOnLoad.idp} helperText={errors.idp?.message} 
        error={errors.idp?.message ? true: false} />
      <br/><br/>
      <Button variant="contained" type="submit" color="primary">Salvar</Button>&nbsp;&nbsp;
      <Button variant="outlined" 
                    onClick={()=>history.goBack()} >Cancelar</Button>
    </form>
    </Box>
  </>
  );
    
}

export {FormProjeto};