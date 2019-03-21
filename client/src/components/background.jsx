import React from 'react';
var maskRight=require('../resources/Asset_1.svg')

var style = {
  height: '100vh', width: '100vw',
  position:'absolute',
  top:0,
  left:0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  background:`url(${maskRight}) right bottom repeat`,
  backgroundColor: '#303030',
}

export default function(props){
    return(
        <div className="animated fadeIn"  style={style}>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <div className="animated fadeInRight" style={{ fontSize: 70, fontWeight: 900, color: 'rgb(49, 231, 182)' }}>
                {props.title}
                </div>
            </div>
            {props.children}
            <div style={{ display: 'flex', flex: 1 }}></div>
        </div>
    )
}

// class App extends Component {
//   constructor(props) {
//     super(props)
//   }

//   renderElem(){
//     if(this.props.loginState.loggedIn){
//       return 
//     }
//   }
  
//   render() {
//     if(!this.props.loginState.loggedIn)
//     return (
//       <div className="" style={style}>
//         <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <div style={{ fontSize: 70, fontWeight: 900, color: 'rgb(49, 231, 182)' }}>Intruder</div>
//         </div>
//         <Login />
//         <div style={{ display: 'flex', flex: 1 }}></div>
//       </div>
//     )
//     else
//     return(
//       <div className="" style={style}>
//         <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         </div>
//         <Timmer/>
//         <div style={{ display: 'flex', flex: 1 }}></div>
//       </div>
//     )
//   }
// }


// function mapStateToProps(state){
//   return({loginState:state.loginState})
// }

// export default connect(mapStateToProps)(App)