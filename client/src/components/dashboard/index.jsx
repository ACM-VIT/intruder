import React, { Component } from 'react';
import {connect} from 'react-redux'
import Timmer from './timmer'
import Question from './question'
import {connectToSocket,setJwt} from '../../actions'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount(){
    if(this.props.jwt&&!this.props.socketId)
      this.props.connectToSocket(this.props.jwt);
    else
      this.props.setJwt()
      this.props.connectToSocket(this.props.jwt)
  }

  renderElem(){
    if(this.props.wait){
      return <Timmer/>
    }
    return <Question/>
  }

  render() {
    return this.renderElem()
  }
}


function mapStateToProps(state){
  return({
    wait:state.waitState.wait,
    jwt:state.appState.jwt,
    socketId:state.appState.socketId
  })
}

export default connect(mapStateToProps,{connectToSocket,setJwt})(App)