import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { userLogin, adminLogin, register } from '../../actions/connectFunc'
import { connect } from 'react-redux'
import Background from '../background'
import TextField from './login'
import Switch from '@material-ui/core/Switch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', usid: '', login: true, admin: false, pass: '', stats:false }
  }
  statsSwitch(){
    this.setState({ stats: !this.state.stats })
  }
  login(e) {
    e.preventDefault()
    this.props.userLogin(this.state.usid, this.state.pass)
  }
  reg(e) {
    e.preventDefault()
    this.props.register(this.state.usid, this.state.name, this.state.pass)
  }
  loginState() {
    this.setState({ login: !this.state.login })
  }
  adminSwitch() {
    this.setState({ admin: !this.state.admin })
  }
  adminLogin(e) {
    e.preventDefault()
    this.props.adminLogin(this.state.pass,this.state.stats)
  }
  render() {
    return (
      <Background title="Intruder">
        <Card className="animated fadeInLeft" style={{ width: '100%', maxWidth: '400px', color: '#fff', background: 'rgb(69, 69, 69)' }}>
        <form onSubmit={this.state.admin ? this.adminLogin.bind(this) : this.state.login ? this.login.bind(this) : this.reg.bind(this)}>
          <CardContent style={{ color: '#fff' }}>
            <div style={{ color: 'rgb(49, 231, 182)', textAlign: 'left' }}><span style={{ cursor: 'pointer' }} onClick={this.adminSwitch.bind(this)}>
              {this.state.admin ? 'User?' : 'Admin?'}
            </span></div>
            <div className="frm">
            <TextField
              setState={(e) => this.setState(e)}
              usid={this.state.usid}
              name={this.state.name}
              admin={this.state.admin}
              login={this.state.login}
              pass={this.state.pass}
            />
            </div>

            <div style={{ height: 20 }}>
              <span style={{ float: 'left', color: '#ef5350' }}>
                {this.props.loginErr ? this.props.loginErr !== true ? this.props.loginErr : 'Invalid login credentials!' : ''}
              </span>
              <span style={{ float: 'right', cursor: 'pointer', color: 'rgb(49, 231, 182)' }} onClick={this.loginState.bind(this)}>
                {this.state.admin ? <span onClick={this.statsSwitch.bind(this)}><Switch
                  checked={this.state.stats}
                  style={{height:30}}
                  value="checkedB"
                  color="primary"
                />Stats</span> : this.state.login ? 'Register?' : 'Login?'}
              </span>
            </div>
          </CardContent>
          <button type='submit'
            style={{
              width:'100%',
              border:0,
              cursor: 'pointer', padding: 20, fontSize: 20, fontWeight: 900,
              color: 'rgb(55, 61, 65)',
              background: this.props.lock ? '#9e9e9e' : 'rgb(49, 231, 182)',
              textAlign: 'center',
              pointerEvents: this.props.lock ? 'none' : 'auto'
            }}
          >
            {this.props.lock ? 'Logging in...' : this.state.admin ? 'Admin Login' : this.state.login ? 'Login' : 'Register'}
          </button>
          </form>
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
export default connect(mapStateToProps, { userLogin, adminLogin, register })(App);