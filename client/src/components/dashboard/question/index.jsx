import React from 'react';
import SideBar from './bar'
import Panel from './pannel'

require('./style.css')


class App extends React.Component {
    render(){
        return (
            <div className="animated fadeIn" style={{position:'absolute',left:'1', height:'100vh',width:'100%'}}>
                <Panel/>
                <SideBar/>
            </div>
        )
    }
}

export default App