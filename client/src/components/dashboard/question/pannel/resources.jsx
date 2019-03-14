import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

class App extends React.Component {
    render(){
        if(this.props.img || this.props.audio || this.props.video || this.props.txt)
        return(
            <div style={{display:'block'}}>

                <Divider/>
                <Typography color="textSecondary" style={{textAlign:'left',color:'#31e7b6',fontWeight:'bold'}}>
                    Resources<br/>
                </Typography>
                <div>
                    
                    {this.props.txt?
                        <div style={{textAlign:'left',width:'80%', margin:'auto',backgroundColor:'rgb(48, 48, 48)',padding:10, border:'1px solid #efefef'}}>
                            <pre style={{whiteSpace: 'pre-wrap'}}>
                                {this.props.txt}
                            </pre>
                        </div>
                        :<div/>
                    }


                    {this.props.img?
                        <div style={{display:'inline-block', padding:15}}>
                            <img style={{maxWidth:'100%',maxHeight:'200px'}} src={this.props.img}/>
                            <br/><a target="_blank" style={{color:'#31e7b6'}} href={this.props.img}>Download</a>
                        </div>
                        :<div/>
                    }


                    {this.props.video?
                        <div style={{display:'inline-block', padding:15}}>
                            <video style={{maxWidth:'100%',maxHeight:'200px'}} controls>
                                <source src={this.props.video} type="video/mp4"/>
                            </video>
                            <br/><a target="_blank" style={{color:'#31e7b6'}} href={this.props.video}> Download</a>
                        </div>
                        :<div/>
                    }


                    {this.props.audio?
                        <div style={{display:'inline-block',padding:15}}>
                            <audio controls>
                            <source src={this.props.audio} type="audio/mp3"/>
                            </audio>
                            <br/><a target="_blank" style={{color:'#31e7b6'}} href={this.props.audio}>Download</a>
                        </div>
                        :<div/>
                    }

                </div>
            </div>
        )
        else return <div/>
    }
}

export default App