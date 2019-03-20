import React from 'react'
import SideBar from './question/bar'
import './question/style.css'
import Button from '@material-ui/core/Button';
// import AceEditor from 'react-ace';
// import 'brace/mode/asciidoc.js';
// import 'brace/theme/twilight';
import { skip, emitQuestion } from '../../actions/adminFunc'
import { connect } from 'react-redux'
class App extends React.Component {
    render() {
        return (
            <div>
                <SideBar admin />
                <div id="panel" style={{ paddingTop: 40 }}>
                    <Button variant="contained" color="primary" onClick={() => this.props.emitQuestion(this.props.socket)}>
                        Emit Question
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => this.props.skip(this.props.socket)}>
                        Skip Question
                    </Button>
                    <br /><br />
                    {/* <AceEditor
                        cursor="slim"
                        mode="asciidoc"
                        fontSize={16}
                        height='200px'
                        width="100%"
                        theme="twilight"
                        // value={this.props.value}
                        // onChange={this.onChange.bind(this)}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        onLoad={(editor) => {
                            editor.getSession().setUseWrapMode(true);
                            editor.setReadOnly(true)
                        }}
                    /> */}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return ({
        socket: state.appState.socket
    })
}

export default connect(mapStateToProps, { skip, emitQuestion })(App)
