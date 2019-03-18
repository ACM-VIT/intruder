import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';  
const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#303030',
        main: '#303030',
        dark:'#303030'
     }
  }
});

export default class FormDialog extends React.Component {
  state = {
    open: this.props.open,
    value:''
  };
  submit(){
    this.props.sendMsg(this.state.value)
  }
 
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <div style={{background:'#31e7b6', width:480, maxWidth:'calc(100vw - 96px)'}}>
          <DialogTitle id="form-dialog-title">
            <span style={{color:'#303030',fontWeight:600}}>Success</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Send a message to everyone.
            </DialogContentText>
            <MuiThemeProvider theme = { theme }>
            <TextField
                value={this.state.value}
                onChange={(e)=>this.setState({value:e.target.value})}
                autoFocus
                margin="dense"
                id="name"
                label="Message"
                type="email"
                fullWidth
            />
            </MuiThemeProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.submit.bind(this)} color="primary">
              Submit
            </Button>
          </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}