import React, { Component } from 'react';
import { connect } from 'react-redux'
import Timmer from './timmer'
import Question from './question'
import { setJwt, sendMsg } from '../../actions/userFunc'
import AdminPanel from './admin'
import SuccessDialog from './successDiag'
import StatsListener from './statsListener'

class App extends Component {
  renderElem() {
    if (this.props.statsListen) {
      return <StatsListener />
    }
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
        {this.props.success ?
          <SuccessDialog open={this.props.success} socket={this.props.socket} sendMsg={this.props.sendMsg} />
          : <div />}
        {this.renderElem()}
      </div>
    )
  }
}


function mapStateToProps(state) {
  var { success, admin, jwt, socket, statsListen } = state.appState
  return ({
    wait: state.waitState.wait,
    success, admin, jwt, socket, statsListen
  })
}

export default connect(mapStateToProps, { setJwt, sendMsg })(App)