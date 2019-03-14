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
      if(!this.props.cipher)
        return this.setState({code:newValue})
      if(newValue===this.state.code.slice(0,-1))
        return this.setState({code:newValue})
      if(newValue.slice(0,-1)===this.state.code){
        var asci=newValue.slice(-1).charCodeAt();
        if(asci>=65 && asci<=90){
          asci=cipherFun(asci-65)+65
        }
        if(asci>=97 && asci<=122){
          asci=cipherFun(asci-97)+97
        }
        var ne=String.fromCharCode(asci)
        return this.setState({code:this.state.code+ne})
      }
      else return this.setState({code:''})

    }
    render() {
      const options = {
        selectOnLineNumbers: true,
        wordWrap:'on'
      };
      return (
        <AceEditor
          cursor="slim"
          mode="asciidoc"
          fontSize= {16}
          height={200}
          width="100%"
          theme="twilight"
          value={this.state.code}
          onChange={this.onChange.bind(this)}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
          onLoad={(editor) => {
            editor.focus();
            editor.getSession().setUseWrapMode(true);
            editor.setTheme("ace/theme/clouds");
          }}
        />
      );
    }
  }

export default App