import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    multilineColor:{
        color:'rgb(49, 231, 182)',
    },
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
            InputProps={{
                classes: {
                    input: props.classes.multilineColor,
                }
            }}
        />:<span/>}
        <TextField
            value={props.usid}
            onChange={(e)=>props.setState({usid:e.target.value})}
            style={{width:'100%'}}
            label={props.admin?"Admin ID":"Unique ID"}
            margin="normal"
            variant="outlined"
            InputProps={{
                classes: {
                    input: props.classes.multilineColor,
                }
            }}
        />
        </div>
    )
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
