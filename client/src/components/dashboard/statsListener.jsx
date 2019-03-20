import React from 'react'
import SideBar from './question/bar'
import './question/style.css'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/twilight';
import { connect } from 'react-redux'
class App extends React.Component {
    render() {
        return (
            <div>
                <SideBar admin/>
                <div style={{ paddingTop: 40 }}>
                    <br /><br />
                    <AceEditor
                        cursor="slim"
                        mode="javascript"
                        fontSize={16}
                        height='calc(100vh - 100px)'
                        width="100%"
                        theme="twilight"
                        value={this.props.value}
                        // onChange={this.onChange.bind(this)}
                        name="UNIQUDIV"
                        editorProps={{ $blockScrolling: true }}
                        onLoad={(editor) => {
                            editor.getSession().setUseWrapMode(true);
                            editor.setReadOnly(true)
                            editor.session.setOption("useWorker", false)
                        }}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return({
        value:state.appState.statsConsoleVal
    })
}

export default connect(mapStateToProps)(App)
