import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const drawerWidth = 370;

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
  },
  appBar2: {
    top: 'auto',
    bottom: 0,
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
});

class ResponsiveDrawer extends React.Component {
  state = {
    anchorEl: null,
  };
  logout() {
    alert()
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { anchorEl } = this.state;
    var { classes } = this.props;

    return (
      <div>
        <AppBar style={{ color: '#fff', zIndex:20000,backgroundColor: 'rgb(48, 48, 48)' }} position="fixed" className={this.props.admin ? classes.appBar : undefined}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.onClick}
              className={classes.menuButton}
              anchor="right"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" color="inherit" noWrap style={{ fontWeight: 900, color: '#31e7b6' }}>
              Intruder
                </Typography>
            <div className={classes.grow} />

            <Typography variant="subtitle1" color="inherit" noWrap style={{ cursor: 'pointer' }}>
              <Button color="inherit" onClick={this.logout}>Logout</Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);