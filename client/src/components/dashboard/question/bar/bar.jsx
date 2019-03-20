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
import AccountCircle from '@material-ui/icons/AccountCircle';

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
  
    handleDrawerToggle = () => {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };
    handleProfileMenuOpen = event => {
      this.setState({ anchorEl: event.currentTarget });
    };
    handleMenuClose = () => {
      this.setState({ anchorEl: null });
    };
    render() {
        const { anchorEl } = this.state;
        const renderMenu = (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
            >
              {/* <MenuItem>Shubham Awasthi</MenuItem> */}
              <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
            </Menu>
          );
          const { classes } = this.props;

          return (
            <div>
            <AppBar  style={{color:'#fff',backgroundColor:'rgb(48, 48, 48)'}} position="fixed" className={!this.props.admin?classes.appBar:undefined}>
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
                <Typography variant="h4" color="inherit" noWrap style={{fontWeight:900, color:'#31e7b6'}}>
                  Intruder
                </Typography>
                <div className={classes.grow} />
                <IconButton
                    aria-owns='material-appbar'
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Typography variant="subtitle1" color="inherit" noWrap onClick={this.handleProfileMenuOpen} style={{cursor:'pointer'}}>
                  <span style={{color:'grey'}}>{this.props.username}</span>
                </Typography>
              </Toolbar>
              {renderMenu}
            </AppBar>
{/* 
            <AppBar position="fixed" color="primary" className={classes.appBar2}>
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
                <Typography variant="h6" color="inherit" noWrap>
                  Intruder
                </Typography>
                <div className={classes.grow} />
                <IconButton
                    aria-owns='material-appbar'
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Typography variant="p" color="inherit" noWrap>
                  <span style={{color:'grey'}}>awasthishubh</span>
                </Typography>
              </Toolbar>
              {renderMenu}
      </AppBar> */}
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