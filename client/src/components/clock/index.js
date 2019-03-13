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
    return (
      <div className="" style={{background:'#303030',height:'100vh', width:'100vw', display:'flex','justifyContent':'center',flexDirection: 'column'}}>
        <div style={{display:'flex',flex:1}}></div>
        <Clock sec={this.state.sec>0?this.state.sec:0} done={this.state.done}/>
        <div style={{display:'flex',flex:1}}></div>
      </div>
    );
  }
}

export default App;
