import React, { Component } from 'react';
import Timmer from './timmer'
import Login from './login'
var maskRight=require('../../resources/Asset_1.svg')
var maskLeft=require('../../resources/Mask_Group_left.svg')

var style = {
  height: '100vh', width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  background:`url(${maskRight}) right bottom repeat`,
  backgroundColor: '#303030',
  // background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("https://i.imgur.com/xnh5x47.jpg");
  // backgroundSize: '100px 80px'
}

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="" style={style}>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* <div style={{ fontSize: 70, fontWeight: 900, color: 'rgb(49, 231, 182)' }}>Intruder</div> */}
        </div>
        {/* <Login /> */}
        <Timmer/>
        <div style={{ display: 'flex', flex: 1 }}></div>
      </div>
    )
  }
}

export default App;