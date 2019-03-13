import React, { Component } from 'react';
import Clock from './clock'

class App extends Component {
  constructor(props){
    super(props)
    this.state={sec:20, done:false}
  } 
  componentDidMount(){
    var tiId=setInterval((e)=>{
      this.setState({sec:this.state.sec-1/10})
    },100)
    setTimeout((e)=>{
      clearInterval(tiId)
      this.setState({done:true})
    },this.state.sec*1000+100)
  }
  render() {
    return(
    <Clock sec={this.state.sec>0?this.state.sec:0} done={this.state.done}/>
    );
  }
}

export default App;
