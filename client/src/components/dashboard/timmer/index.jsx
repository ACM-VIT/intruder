import React, { Component } from 'react';
import Clock from './clock'
import Dialogue from './dialogue'
import Background from '../../background'
import { connect } from 'react-redux'
import { logout } from '../../../actions/userFunc'

class App extends Component {
  constructor(props) {
    super(props)
    var totalSec = this.props.waitTime
    this.state = { sec: totalSec, totalSec, done: false }
  }
  componentDidMount() {
    var tiId = setInterval((e) => {
      this.setState({ sec: this.state.sec - 1 / 10 })
    }, 1000 / 10)
    setTimeout((e) => {
      clearInterval(tiId)
      this.setState({ done: true })
      this.setState({ sec: 0 })
    }, this.state.sec * 1000 + 100)
  }
  render() {
    return (
      <Background username={this.props.user.username} logout={this.props.logout} title={
        this.props.waitType === 'intrusion' ? <span style={{ color: '#ef5350' }}>Intrusion!</span>
          : this.props.waitType === 'fail' ? <span style={{ fontSize: 50 }}>Wrong Submission!</span>
            : this.props.waitType === 'finished' ? <span style={{ fontSize: 50 }}>Finished!</span>
              : <span />
      } color="">
        {this.props.displayMsg ? <Dialogue
          waitType={this.props.waitType}
          message={this.props.message}
          messageFrom={this.props.messageFrom}
        /> : <div />}
        <Clock
          waitType={this.props.waitType}
          totalSec={this.state.totalSec}
          sec={this.state.sec > 0 ? this.state.sec : 0}
          done={this.state.done || this.props.waitType === 'finished'}
        />
      </Background>
    );
  }
}

function mapStateToProps(state) {
  var { waitTime, message, messageFrom, displayMsg, waitType } = state.waitState
  return ({ waitTime, message, messageFrom, waitType, displayMsg, user:state.appState.user })
}

export default connect(mapStateToProps, { logout })(App)