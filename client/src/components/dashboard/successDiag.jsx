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
    value:'',
    sec:5
  };
  componentDidMount(){
    var cn=setInterval(()=>{
      this.setState({sec:this.state.sec-1})
    },1000)
    setTimeout(()=>{
      clearInterval(cn)
    },5000)
  }
  
  submit(e){
    e.preventDefault()
    this.props.sendMsg(this.props.socket, this.state.value)
  }
 
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
        <form onSubmit={this.submit.bind(this)} style={{background:'#31e7b6', width:480, maxWidth:'calc(100vw - 96px)'}}>
          <DialogTitle id="form-dialog-title">
            <span style={{color:'#303030',fontWeight:600}}>Success</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Send a message to everyone. (in {this.state.sec}{this.state.sec>1?'secs':'sec'})
            </DialogContentText>
            <MuiThemeProvider theme = { theme }>
            <TextField
                value={this.state.value}
                onChange={(e)=>this.setState({value:e.target.value})}
                autoFocus
                margin="dense"
                id="name"
                label="Message"
                fullWidth
            />
            </MuiThemeProvider>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="secondary">
              Submit
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}