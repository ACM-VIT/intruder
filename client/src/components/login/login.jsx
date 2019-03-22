import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    multilineColor:{
        color:'#fff',
    },
    inputLabelProps:{
        color:'rgb(49, 231, 182)',
    }
})

function App(props){
    return(
        <div>
        {
        !props.admin&&!props.login?
        <TextField
            value={props.name}
            onChange={(e)=>props.setState({name:e.target.value})}
            label="Name"
            margin="normal"
            variant="outlined"
            style={{width:'100%'}}
            InputLabelProps={{
                classes: {
                    root: props.classes.inputLabelProps,
                }
            }}
            InputProps={{
                classes: {
                    input: props.classes.multilineColor,
                }
            }}
        />:<span/>}
        {!props.admin?
        <TextField
            value={props.usid}
            onChange={(e)=>props.setState({usid:e.target.value})}
            style={{width:'100%'}}
            label={"Username"}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
                classes: {
                    root: props.classes.inputLabelProps,
                }
            }}
            InputProps={{
                classes: {
                    input: props.classes.multilineColor,
                }
            }}
        />:<span/>}
        
        <TextField
            inputProps={{autocomplete:"new-password"}}
            value={props.pass}
            onChange={(e)=>props.setState({pass:e.target.value})}
            label={props.admin?"Admin ID":"Passcode"}
            type="password"
            margin="normal"
            variant="outlined"
            style={{width:'100%'}}
            InputLabelProps={{
                classes: {
                    root: props.classes.inputLabelProps,
                }
            }}
            InputProps={{
                classes: {
                    input: props.classes.multilineColor,
                },
            }}
            />
        </div>
    )
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
