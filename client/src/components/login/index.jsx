import React, { Component } from 'react';
import Login from './login'
import {connect} from 'react-redux'
import Background from '../background'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Background title="Intruder">
        <Login />
        </Background>
    )
  }
}


function mapStateToProps(state){
  return({loginState:state.loginState})
}

export default connect(mapStateToProps)(App)