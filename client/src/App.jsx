import React, { Component } from 'react';
import Login from './components/login';
import Dashboard from './components/dashboard'
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { reLogin } from './actions/connectFunc'
const theme = createMuiTheme({
	palette: {
		primary: {
			light: 'rgb(49, 231, 182)',
			main: 'rgb(49, 231, 182)',
			dark: 'rgb(49, 231, 182)'
		},
		secondary: {
			light: '#fff',
			main: '#303030',
			dark: '#303030'
		},
	},
	typography: {
		useNextVariants: true
	}
});

class App extends Component {
	componentWillMount(){
		if(this.props.loggedIn===null){
			this.props.reLogin()
		}
	}
	renderElem() {
		if (this.props.loggedIn) {
			return <Dashboard />
		}
		else return <Login />
	}
	render() {
		console.log(this.props)
		return (
			<MuiThemeProvider theme={theme}>
				{this.renderElem.bind(this)()}
			</MuiThemeProvider>

		);
	}
}

function mapStateToProps(state) {
	return ({ loggedIn: state.appState.loggedIn })
}
export default connect(mapStateToProps,{ reLogin })(App)