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

const styles = theme => ({
    multilineColor:{
        color:'rgb(49, 231, 182)',
    },
})
class App extends Component {
    render(){
        const { classes } = this.props;
        return(
            <Card style={{width:'100%', maxWidth:'400px',color:'#fff', background:'rgb(69, 69, 69)'}}>
            
      <CardContent style={{color:'#fff'}}>
      <TextField
            id="outlined-email-input"
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
            id="outlined-email-input"
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
      <div style={{padding:20,fontSize:20,fontWeight:900,color:'rgb(55, 61, 65)', background:'rgb(49, 231, 182)',textAlign:'center'}}>
                Login
            </div>
    </Card>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(App);