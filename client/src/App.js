import React, { Component } from 'react';
import Clock from './components/clock';
import Dashboard from './components/dashboard/layout'
import './App.css';
import {HashRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
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
      </div>
      
    );
  }
}

export default App;
