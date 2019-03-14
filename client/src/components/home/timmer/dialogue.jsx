import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
            classes={{root:{background:'red',color:'blue'},container:{background:'red',color:'blue'}}}
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
            <div style={{background:'#31e7b6', width:480, maxWidth:'calc(100vw - 96px)'}}>
          <DialogTitle id="alert-dialog-slide-title" color="secondary">
            <div style={{fontWeight:500,color:'#303030'}}>A New Message!
                <div style={{fontSize:15,color:'#454545'}}>(from awasthishubh)</div>
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" style={{color:'#454545'}}>
              Good Morning...
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;