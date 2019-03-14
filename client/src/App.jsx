import React, { Component } from 'react';
import Clock from './components/home';
import Dashboard from './components/dashboard'
import './App.css';
import {HashRouter, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  

const theme = createMuiTheme({
  palette: {
     primary: {
        light: 'rgb(49, 231, 182)',
        main: 'rgb(49, 231, 182)',
        dark: 'rgb(49, 231, 182)'
     },
     secondary: {
      light: '#fff',
       main: '#303030',
       dark: '#303030'
     },
  },
  typography: { 
     useNextVariants: true
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme = { theme }>
        <HashRouter>
          <Switch>
            <Route path='/dashboard'>
              <Dashboard/>
            </Route>
            <Route path='/'>
            <Clock/>
            </Route>
          </Switch>
        </HashRouter>
        </MuiThemeProvider>
      
    );
  }
}

export default App;
