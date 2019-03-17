import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { login } from '../../actions'
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
    this.state = { name: '', usid: '', login: true }
  }
  login() {
    this.props.login(this.state.name, this.state.usid)
  }
  reg() {
    this.props.login(this.state.usid)
  }
  loginState() {
    this.setState({ login: !this.state.login })
  }
  render() {
    const { classes } = this.props;
    return (
      <Background title="Intruder">
        <Card className="animated fadeInLeft" style={{ width: '100%', maxWidth: '400px', color: '#fff', background: 'rgb(69, 69, 69)' }}>
          <CardContent style={{ color: '#fff' }}>
            {
              this.state.login ?
                <Login setState={(e)=>this.setState(e)} usid={this.state.usid}/>
                :
                <Reg setState={(e)=>this.setState(e)} name={this.state.name} usid={this.state.usid}/>
            }
            <div style={{ color: 'rgb(49, 231, 182)', textAlign: 'right' }}><a style={{ cursor: 'pointer' }} onClick={this.loginState.bind(this)}>
              {this.state.login ? 'Register?' : 'Login?'}
            </a></div>
          </CardContent>
          <div
            style={{ cursor: 'pointer', padding: 20, fontSize: 20, fontWeight: 900, color: 'rgb(55, 61, 65)', background: 'rgb(49, 231, 182)', textAlign: 'center' }}
            onClick={this.state.login ? this.login.bind(this) : this.reg.bind(this)}
          >
            {this.state.login ? 'Login' : 'Register'}
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
  return ({ loggedIn: state.appState.loggedIn })
}
export default connect(mapStateToProps, { login })(withStyles(styles)(App));