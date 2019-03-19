import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Editor from './editor'
import Resources from './resources'
import {connect} from 'react-redux'
import {submitResponse,sendMsg} from '../../../../actions/userFunc'
require('../style.css')

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            editorVal:'// Clear this and type your answer here...',
            successMsg:''
        }

    }

    submit(){
        this.props.submitResponse(this.state.editorVal)
    }

    render(){
        return (
            <div id="panel">
                <div style={{height:'calc(100vh - 60px)',overflow: 'auto'}}>
                    <Card className="animated fadeInUpBig" style={{margin:40, background:'#454545', color:'#fff'}}>
                    <CardContent>
                        <Typography gutterBottom style={{textAlign:'left',color:'#31e7b6',fontWeight:'bold',}}>
                            Question
                        </Typography>
                        <Typography component="p" style={{color:'#fff',padding: '10px 40px'}}>
                            {this.props.ques}
                        </Typography>
                        <Resources
                            img={this.props.img}
                            audio={this.props.audio}
                            video={this.props.video}
                            txt={this.props.txt}
                        />
                    </CardContent>
                    </Card >
                    <div style={{}}>
                        <Card className="animated bounceInUp" style={{display:'block', margin:40 ,background:'#454545', color:'#fff'}}>
                        <CardContent style={{textAlign:'left',position:'relative'}}>
                            <Typography color="textSecondary" gutterBottom style={{position:'absolute' ,color:'#31e7b6',fontWeight:'bold'}}>
                                Answer
                            </Typography>   
                            <div style={{margin: '40px', overflow:'auto'}}>
                                <Editor
                                    cipher={this.props.cipher}
                                    value={this.state.editorVal}
                                    onChange={(e)=>this.setState({editorVal:e})}
                                    lock={this.props.lock}
                                />
                            </div>
                            <CardActions style={{ position:'absolute', bottom: 0, padding: 14,left:0,width: '100%'}}>
                                <Button 
                                    variant="contained" 
                                    style={{
                                        margin:'auto',
                                        backgroundColor:'#31e7b6',
                                        color:'#373d41',
                                        pointerEvents:this.props.lock?'none':'auto'
                                    }} size="medium" color="primary"
                                    onClick={this.submit.bind(this)}
                                >
                                    {this.props.lock?'Locked!':'Submit'}
                                </Button>
                            </CardActions>
                        </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    var {ques,img,audio,video,cipher,txt}=state.quesState
    var {lock,success}=state.appState
    return({ques,img,audio,video,cipher,txt,lock,success})
}

export default connect(mapStateToProps,{submitResponse,sendMsg})(App)