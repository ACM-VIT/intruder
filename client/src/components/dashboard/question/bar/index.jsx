import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Bar from './bar'
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';

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
      <div style={{ color: '#fff', background: 'rgb(48, 48, 48)', marginBottom:0 }}>
        <div style={{ margin: 20 }} >
          <div style={{ margin: 0, height: 40, color: '#31e7b6' }}></div>
          <Divider />
          <div style={{ minHeight:'calc(100vh - 111px)',textAlign: 'center', marginTop: 30, lineHeight: 1.5 }}>
            <Avatar src='https://api.adorable.io/avatars/285/shubham.png' style={{ height: 200, width: 200, margin: 'auto' }}>
            </Avatar>
            <h1 style={{}}>
              Shubham Awasthi
              <div style={{ fontSize: 15 }}>
                @awasthishubh
              </div>
            </h1>
            <Divider />
            <div style={{ margin: '20px 0' }}>
              <div style={{ textAlign: 'left' }}>Last Message:</div>
              <pre style={{ whiteSpace: ' pre-wrap' }}>
                Consectetur minim cillum sunt do mollit aliquip velit enim.
              </pre>
            </div>
            <div>
              {/* <div style={{ display:'inline-block', width:'10%', flex:1, textAlign: 'left' }}>From:</div> */}
              <pre style={{ whiteSpace: ' pre-wrap', textAlign: 'right', flex: 1 }}>
                -awasthishubh
              </pre>
            </div>

          </div>
        </div>
      </div>
    );
    return (
      <div id={!this.props.admin ? "leftBar" : ''} className={classes.root} >
        <Bar admin={this.props.admin} onClick={this.handleDrawerToggle} username={this.props.username} />
        <nav className={classes.drawer} >
          <Hidden smUp implementation="css">
            <Drawer
              style={{ backgroundColor: 'rgb(48, 48, 48)' }}
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          {!this.props.admin ? <Hidden xsDown implementation="css">
            <Drawer
              anchor="right"
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden> : <div />}
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
  var { username } = state.appState
  return ({ username })
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer));