import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Bar from './bar'
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { logout } from '../../../../actions/userFunc'

const drawerWidth = 370;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    border: 0,
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div style={{ color: '#fff', background: 'rgb(48, 48, 48)', height:'100%' }}>
        <div style={{ margin: 20 }} >
          <h2 style={{ margin: 0, height: 40, color: '#31e7b6' }}>Rules</h2>
          <Divider />
          <div style={{ marginTop: 10, overflow: 'auto', lineHeight: 1.5 }}>
            <ul>
              {(() => {
                let a = []
                require('../../../../config.json').rules.forEach((element, i) => {
                  a.push(<li key={i}>{element}</li>)
                });
                return a;
              })()}
              <li>iknjn</li>
            </ul>
          </div>
        </div>
      </div>
    );
    return (
      <div id={!this.props.admin ? "leftBar" : ''} className={classes.root} >
        <Bar
          message={this.props.message}
          messageFrom={this.props.messageFrom}
          admin={this.props.admin}
          onClick={this.handleDrawerToggle}
          user={this.props.user}
          logout={this.props.logout}
        />
        <nav className={classes.drawer} >
          <SwipeableDrawer
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            onOpen={this.handleDrawerToggle}
            anchor="right"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </SwipeableDrawer>

        </nav>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  var { user } = state.appState
  var { message, messageFrom } = state.waitState
  return ({ user, message, messageFrom })
}

export default connect(mapStateToProps, { logout })(withStyles(styles, { withTheme: true })(ResponsiveDrawer));