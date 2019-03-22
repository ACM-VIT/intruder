import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class CircularIntegration extends React.Component {

  render() {
    const { classes } = this.props;

    var animateClass = this.props.sec > 3 ? '' : this.props.done ? ' animated infinite pulse' : ' animated infinite tada'

    return (
      <div className={classes.root} style={{ flexDirection: 'column', display:'flex' }}>
        <div style={{ color: '#fff', fontWeight: 900, marginBottom: 10, fontSize: 30, height: 40 }}>
          {!this.props.waitType ? 'Please wait' : !this.props.done ? 'Wait for' : ''}
        </div>
        <div style={{ margin: 'auto' }} className={classes.wrapper + animateClass}>
          <Fab style={{ height: 200, width: 200, backgroundColor: '#454545' }}>
            <div style={{ fontSize: 80, color: '#fff' }}>
              {!this.props.waitType||this.props.waitType==='finished' ? '∞' : Math.floor(this.props.sec)}
            </div>
          </Fab>
          <CircularProgress
            style={{ color: this.props.waitType=='intrusion'?'#ef5350':'#31e7b6' }}
            size={210}
            className={classes.fabProgress}
            variant="static"
            value={this.props.done?0:this.props.sec * 100 / this.props.totalSec}
          />
        </div>
        <div style={{ color: '#fff', fontWeight: 900, marginTop: 10, fontSize: 30, height: 40 }}>
          {!this.props.waitType ? 'We are about to start.' 
          : this.props.waitType==='finished'?'Result is being generated.': this.props.done ? 'Requesting question...' 
          : 'Seconds'}
        </div>
      </div>
    );
  }
}

CircularIntegration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIntegration);