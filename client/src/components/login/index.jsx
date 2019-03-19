import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { userLogin, adminLogin, register } from '../../actions'
import { connect } from 'react-redux'
import Background from '../background'
import Login from './login'
import Reg from './reg'

const styles = theme => ({
  multilineColor: {
    color: 'rgb(49, 231, 182)',
  },
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', usid: '', login: true, admin: false }
  }
  login() {
    console.log(userLogin)
    this.props.userLogin(this.state.usid)
  }
  reg() {
    this.props.register(this.state.usid, this.state.name)
  }
  loginState() {
    this.setState({ login: !this.state.login })
  }
  adminSwitch() {
    this.setState({ admin: !this.state.admin })
  }
  adminLogin() {
    this.props.adminLogin(this.state.usid)
  }
  render() {
    const { classes } = this.props;
    return (
      <Background title="Intruder">
        <Card className="animated fadeInLeft" style={{ width: '100%', maxWidth: '400px', color: '#fff', background: 'rgb(69, 69, 69)' }}>
          <CardContent style={{ color: '#fff' }}>
            <div style={{ color: 'rgb(49, 231, 182)', textAlign: 'left' }}><span style={{ cursor: 'pointer' }} onClick={this.adminSwitch.bind(this)}>
              {this.state.admin ? 'User?' : 'Admin?'}
            </span></div>
            <Login
              setState={(e) => this.setState(e)}
              usid={this.state.usid}
              name={this.state.name}
              admin={this.state.admin}
              login={this.state.login}
            />

            <div style={{ height: 20 }}>
              <span style={{ float: 'left', color: '#ef5350' }}>
                {this.props.loginErr ? this.props.loginErr !== true ? this.props.loginErr : 'Invalid login credentials!' : ''}
              </span>
              <span style={{ float: 'right', cursor: 'pointer', color: 'rgb(49, 231, 182)' }} onClick={this.loginState.bind(this)}>
                {this.state.admin ? '' : this.state.login ? 'Register?' : 'Login?'}
              </span>
            </div>
          </CardContent>
          <div
            style={{
              cursor: 'pointer', padding: 20, fontSize: 20, fontWeight: 900,
              color: 'rgb(55, 61, 65)',
              background: this.props.lock ? '#9e9e9e' : 'rgb(49, 231, 182)',
              textAlign: 'center',
              pointerEvents: this.props.lock ? 'none' : 'auto'
            }}
            onClick={this.state.admin ? this.adminLogin.bind(this) : this.state.login ? this.login.bind(this) : this.reg.bind(this)}
          >
            {this.props.lock ? 'Logging in...' : this.state.admin ? 'Admin Login' : this.state.login ? 'Login' : 'Register'}
          </div>
        </Card>
      </Background>

    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return ({
    loggedIn: state.appState.loggedIn,
    loginErr: state.appState.loginErr,
    lock: state.appState.lock,
  })
}
export default connect(mapStateToProps, { userLogin, adminLogin, register })(withStyles(styles)(App));