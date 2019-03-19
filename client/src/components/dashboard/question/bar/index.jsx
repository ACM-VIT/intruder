import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Bar from './bar'
import Divider from '@material-ui/core/Divider';
import {connect} from 'react-redux'

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
    border:0,
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
        <div style={{ color:'#fff', background:'rgb(48, 48, 48)'}}>
          <div style={{margin:20}} >
          <h2 style={{margin:0,height:40, color:'#31e7b6'}}>Rules</h2>
          <Divider/>
          <div style={{marginTop:10, overflow:'auto',lineHeight: 1.5}}>
            <ul>
              {(()=>{
                let a=[]
                require('../../../../config.json').rules.forEach((element,i) => {
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
        <div id="leftBar" className={classes.root} >
        <Bar onClick={this.handleDrawerToggle} username={this.props.username}/>
        <nav className={classes.drawer} >
          <Hidden smUp implementation="css">
            <Drawer
              style={{backgroundColor:'rgb(48, 48, 48)'}}
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
          <Hidden xsDown implementation="css">
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
          </Hidden>
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

function mapStateToProps(state){
  var {username}=state.appState
  return({username})
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ResponsiveDrawer));