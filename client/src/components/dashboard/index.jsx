import React, { Component } from 'react';
import {connect} from 'react-redux'
import Timmer from './timmer'
import Question from './question'

class App extends Component {
  constructor(props) {
    super(props)
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
    wait:state.waitState.wait
  })
}

export default connect(mapStateToProps)(App)