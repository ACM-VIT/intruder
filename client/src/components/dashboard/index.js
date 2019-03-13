import React from 'react';
import MonacoEditor from 'react-monaco-editor';


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        code: '// Clear this and type your answer here...',
      }
    }
    editorDidMount(editor, monaco) {
      console.log('editorDidMount', editor);
      editor.focus();
    }
    onChange(newValue, e) {
      console.log('onChange', newValue, e);
    }
    render() {
      const code = this.state.code;
      const options = {
        selectOnLineNumbers: true,
        wordWrap:'on'
      };
      return (
        <MonacoEditor
          width="100%"
          height="200"
          language="javascript"
          theme='vs-dark'
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      );
    }
  }

export default App