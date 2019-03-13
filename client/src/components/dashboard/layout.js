import React from 'react';
import SideBar from './sideBar'
import Panel from './panel'
require('./style.css')

class App extends React.Component {
    render(){
        return (
            <div style={{position:'absolute',display:'flex',flex:1, height:'100vh',width:'100vw'}}>
                <Panel/>
                <SideBar/>
            </div>
        )
    }
}

export default App
