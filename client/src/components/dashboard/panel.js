import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Editor from './index'

require('./style.css')

class App extends React.Component {
    render(){
        return (
            <div id="panel">
                <div style={{marginTop:60,height:'calc(100vh - 60px)',overflow: 'auto'}}>
                    <Card style={{margin:40, background:'#454545', color:'#fff'}}>
                    <CardContent>
                        <Typography gutterBottom style={{textAlign:'left',color:'#31e7b6',fontWeight:'bold',}}>
                            Question
                        </Typography>
                        <CardActions>
                        <Typography component="p" style={{color:'#fff',padding: '10px 40px'}}>
                            Nulla ea adipisicing officia tempor ex deserunt elit sint irure tempor enim adipisicing minim id.
                            Nulla ea adipisicing officia tempor ex deserunt elit sint irure tempor enim adipisicing minim id.
                            Nulla ea adipisicing officia tempor ex deserunt elit sint irure tempor enim adipisicing minim id.
                        </Typography>
                        </CardActions>
                    </CardContent>
                    </Card>
                    <div style={{}}>
                        <Card style={{display:'block', margin:40 ,background:'#454545', color:'#fff'}}>
                        <CardContent style={{textAlign:'left',position:'relative'}}>
                            <Typography color="textSecondary" gutterBottom style={{position:'absolute' ,color:'#31e7b6',fontWeight:'bold'}}>
                                Answer
                            </Typography>
                            <div style={{margin: '40px', overflow:'auto'}}>
                                <Editor />
                            </div>
                            <CardActions style={{ position:'absolute', bottom: 0, padding: 14,left:0,width: '100%'}}>
                                <Button variant="contained" style={{margin:'auto',backgroundColor:'#31e7b6', color:'#373d41'}} size="medium" color="primary">
                                    Submit
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

export default App
