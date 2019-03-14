import React, { Component } from 'react';
import Clock from './clock'
import Dialogue from './dialogue'

class App extends Component {
  constructor(props){
    super(props)
    this.state={sec:10,totalSec:10, done:false}
  } 
  componentDidMount(){
    var tiId=setInterval((e)=>{
      this.setState({sec:this.state.sec-1/10})
    },1000/10)
    setTimeout((e)=>{
      clearInterval(tiId)
      this.setState({done:true})
    },this.state.sec*1000+100)
  }
  render() {
    return(
      <div>
        <Dialogue/>
        <Clock totalSec={this.state.totalSec} sec={this.state.sec>0?this.state.sec:0} done={this.state.done}/>
      </div>
    );
  }
}

export default App;
