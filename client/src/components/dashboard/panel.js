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
                    <Card style={{margin:50, background:'#454545', color:'#fff'}}>
                    <CardContent>
                        <Typography gutterBottom style={{textAlign:'left',color:'#31e7b6'}}>
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
                        <Card style={{display:'block', margin:50 ,background:'#454545', color:'#fff'}}>
                        <CardContent style={{textAlign:'left'}}>
                            <Typography color="textSecondary" gutterBottom style={{color:'#31e7b6'}}>
                                Answer
                            </Typography>
                            <div style={{margin: '10px 40px', border:'1px solid #31e7b6', overflow:'auto'}}>
                                <Editor />
                            </div>
                            <CardActions>
                                <Button variant="contained" style={{margin:'auto', backgroundColor:'#31e7b6', color:'#373d41'}} size="medium" color="primary">
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
