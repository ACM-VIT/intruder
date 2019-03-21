import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/asciidoc.js';
import 'brace/theme/twilight';

var cipherFun=(e)=>{
  return (e+10)%26
}

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        code: '// Clear this and type your answer here...',
      }
    }
    onChange(newValue, e) {
      if(this.props.lock) return this.props.onChange(this.props.value)
      if(!this.props.cipher || newValue===this.props.value.slice(0,-1))
        return this.props.onChange(newValue)

      if(newValue.slice(0,-1)===this.props.value){
        var asci=newValue.slice(-1).charCodeAt();
        if(asci>=65 && asci<=90){
          asci=cipherFun(asci-65)+65
        }
        if(asci>=97 && asci<=122){
          asci=cipherFun(asci-97)+97
        }
        var ne=String.fromCharCode(asci)
          return this.props.onChange(this.props.value+ne)
      }
      else return this.props.onChange('')

    }
    render() {
      return (
        <AceEditor
          cursor="slim"
          mode="asciidoc"
          fontSize= {16}
          style={{height:'calc(100vh - 161px)'}}
          width="100%"
          theme="twilight"
          value={this.props.value}
          onChange={this.onChange.bind(this)}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
          onLoad={(editor) => {
            editor.getSession().setUseWrapMode(true);
          }}
        />
      );
    }
  }

export default App