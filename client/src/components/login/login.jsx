import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {login} from '../../actions'
import {connect} from 'react-redux'

const styles = theme => ({
    multilineColor:{
        color:'rgb(49, 231, 182)',
    },
})

class App extends Component {
    constructor(props){
        super(props);
        this.state={name:'',usid:''}
    }
    submit(){
        this.props.login(this.state.name,this.state.usid)
    }

    render(){
        const { classes } = this.props;
        return(
            <Card className="animated fadeInLeft" style={{width:'100%', maxWidth:'400px',color:'#fff', background:'rgb(69, 69, 69)'}}>
            
      <CardContent style={{color:'#fff'}}>
      <TextField
            value={this.state.name}
            onChange={(e)=>this.setState({name:e.target.value})}
            label="Name"
            margin="normal"
            variant="outlined"
            style={{width:'100%'}}
            InputProps={{
                classes: {
                    input: classes.multilineColor,
                }
            }}
        /><br></br>
        <TextField
            value={this.state.usid}
            onChange={(e)=>this.setState({usid:e.target.value})}
            style={{width:'100%'}}
            label="Unique ID"
            margin="normal"
            variant="outlined"
            InputProps={{
                classes: {
                    input: classes.multilineColor,
                }
            }}
            InputLabelProps={{
                clases:{
                    root: {color:'red'}
                }
            }}
        />
      </CardContent>
      <div 
        style={{cursor:'pointer', padding:20,fontSize:20,fontWeight:900,color:'rgb(55, 61, 65)', background:'rgb(49, 231, 182)',textAlign:'center'}}
        onClick={this.submit.bind(this)}
        >
                Login
            </div>
    </Card>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
function mapStateToProps(state){
    return({loggedIn:state.appState.loggedIn})
}
  export default connect(mapStateToProps,{login})(withStyles(styles)(App));