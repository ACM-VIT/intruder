import React from 'react'
import SideBar from './question/bar'
import './question/style.css'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/twilight';
import { connect } from 'react-redux'
class App extends React.Component {
    componentDidUpdate(){
        this.refs.editRef.editor.focus()
        var row = this.refs.editRef.editor.session.getLength() - 1
        var column = this.refs.editRef.editor.session.getLine(row).length // or simply Infinity
        this.refs.editRef.editor.gotoLine(row + 1, column)
    }
    render() {
        return (
            <div>
                <SideBar admin/>
                <div style={{ paddingTop: 40 }}>
                    <br /><br />
                    <AceEditor
                        ref='editRef'
                        cursor="slim"
                        mode="javascript"
                        fontSize={22}
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
