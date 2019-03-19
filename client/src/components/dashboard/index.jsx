import React, { Component } from 'react';
import { connect } from 'react-redux'
import Timmer from './timmer'
import Question from './question'
import { setJwt, sendMsg } from '../../actions/userFunc'
import AdminPanel from './admin'
import SuccessDialog from './successDiag'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // if (this.props.jwt && !this.props.socketId)
    //   this.props.connectToSocket(this.props.jwt);
    // else
    //   this.props.setJwt()
    // this.props.connectToSocket(this.props.jwt)
  }

  renderElem() {
    if (this.props.admin) {
      return <AdminPanel />
    }
    if (this.props.wait) {
      return <Timmer />
    }
    return <Question />
  }

  render() {
    return (
      <div>
        {this.props.success ? <SuccessDialog open={this.props.success} sendMsg={this.props.sendMsg} /> : <div />}
        {this.renderElem()}
      </div>
    )
  }
}


function mapStateToProps(state) {
  var { success, admin, jwt, socket } = state.appState
  return ({
    wait: state.waitState.wait,
    success, admin, jwt, socket
  })
}

export default connect(mapStateToProps, { setJwt, sendMsg })(App)