import React, { Component } from 'react';
import Clock from './clock'
import Dialogue from './dialogue'
import Background from '../../background'
import {connect} from 'react-redux'

class App extends Component {
  constructor(props){
    super(props)
    var totalSec=this.props.waitTime
    this.state={sec:totalSec,totalSec, done:false}
  } 
  componentDidMount(){
    var tiId=setInterval((e)=>{
      this.setState({sec:this.state.sec-1/10})
    },1000/10)
    setTimeout((e)=>{
      clearInterval(tiId)
      this.setState({done:true})
      this.setState({sec:0})
    },this.state.sec*1000+100)
  }
  render() {
    return(
      <Background>
        {this.props.message?<Dialogue 
          message={this.props.message}
          messageFrom={this.props.messageFrom}
        />:<div/>}
        <Clock 
          totalSec={this.state.totalSec} 
          sec={this.state.sec>0?this.state.sec:0} 
          done={this.state.done}
        />
      </Background>
    );
  }
}

function mapStateToProps(state){
  var {waitTime,message,messageFrom}=state.waitState
  return({waitTime,message,messageFrom})
}

export default connect(mapStateToProps)(App)