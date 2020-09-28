import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import {ListagemProjetos} from '../projetos/ListagemProjetos'
import {FormProjeto} from '../projetos/FormProjeto'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme, responsiveFontSizes  } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";
import Container from '@material-ui/core/Container';
import AppBar from '../appbar/AppBar';
import Drawer from '../appbar/Drawer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  //media query de preferência de tema
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  //estado de preferência do tema
  const [darkState, setDarkState] = useState(prefersDarkMode);
  //estado do drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  //status das requisições
  const status = useSelector(state => state.projetos.status)    
  const error = useSelector(state => state.projetos.error)

  //states do snackbar global de msgs
  var [msg, setMsg] = useState('');
  var [severity, setSeverity] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  //escolha das cores e tipo de tema
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];

  //cria e memoiza o tema
  const theme = React.useMemo(() => responsiveFontSizes(createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor
      },
      secondary: {
        main: mainSecondaryColor
      },
    }
  })), [palletType, mainPrimaryColor, mainSecondaryColor]);


  //seleciona o modo segundo a preferência do usuário
  useEffect(() => setDarkState(prefersDarkMode), [prefersDarkMode]);

  useEffect(() => {
    //exibe as msgs dependendo do status das requisições
    switch(status){
      case 'failed': 
        setMsg(error);
        setSeverity('error');
        setOpenSnackbar(true);
        break;
      case 'saved':
        setMsg('Projeto Salvo com Sucesso!');
        setSeverity('success');
        setOpenSnackbar(true);
        break;
      case 'deleted':
        setMsg('Projeto Excluído com Sucesso!');
        setSeverity('success');
        setOpenSnackbar(true);
        break;
      default:
        break;
    }
  }
  , [status, error]);

  //trata a mudança de estado
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  //handler de abrir e fechar o drawer
  const toggleDrawerHandler = (open) => (event) => {
      if (event?.type === 'keydown' && (event?.key === 'Tab' || event?.key === 'Shift')) {
          return;
      }
      setDrawerOpen(open);
  };
  
  //close do snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnackbar(false);
    setMsg('');
    setSeverity('');
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          <AppBar handleThemeChange={handleThemeChange} darkState={darkState} toggleDrawerHandler={toggleDrawerHandler} />
          <Drawer open={drawerOpen} toggleDrawerHandler={toggleDrawerHandler} />
          <Container maxWidth="xl">
            <div>
              <Switch>
                <Route path="/projetos/novo" component={() => <FormProjeto />}></Route>
                <Route path="/projetos/:id" component={() => <FormProjeto />}></Route>
                <Route path="/projetos" component={() => <ListagemProjetos />}></Route>
                <Route path="/" component={() => <ListagemProjetos />}></Route>
              </Switch>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={severity}>
              {msg}
              </Alert>
            </Snackbar>
          </Container>
        </Router>
    </ThemeProvider>
    </>
  );
}

export default App;
