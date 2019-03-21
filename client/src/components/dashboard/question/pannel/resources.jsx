import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class App extends React.Component {
    render() {
        if (this.props.img || this.props.audio || this.props.video || this.props.txt)
            return (
                <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
                    <Typography color="textSecondary" style={{ textAlign: 'left', color: '#31e7b6', fontWeight: 'bold' }}>
                        Resources<br />
                    </Typography>
                    <div style={{flex:1,overflow:'hidden', textAlign:'center'}}>

                        {/* {this.props.txt ?
                            <div style={{ textAlign: 'left', width: '80%', margin: 'auto', backgroundColor: 'rgb(48, 48, 48)', padding: 10, border: '1px solid #efefef' }}>
                                <pre style={{ whiteSpace: 'pre-wrap' }}>
                                    {this.props.txt}
                                </pre>
                            </div>
                            : <div />
                        } */}


                        {this.props.img ?
                            <div style={{ display: 'block',height:'100%', padding: 15 }}>
                                <img alt="img" style={{ maxWidth: '100%', maxHeight: '100%' }} src={this.props.img} />
                                <br />
                                {/* <a target="_blank" rel="noopener noreferrer" style={{ color: '#31e7b6' }} href={this.props.img}>Download</a> */}
                            </div>
                            : <div />
                        }


                        {/* {this.props.video ?
                            <div style={{ display: 'inline-block', padding: 15 }}>
                                <video style={{ maxWidth: '100%', maxHeight: '200px' }} controls>
                                    <source src={this.props.video} type="video/mp4" />
                                </video>
                                <br /><a target="_blank" rel="noopener noreferrer" style={{ color: '#31e7b6' }} href={this.props.video}> Download</a>
                            </div>
                            : <div />
                        } */}


                        {/* {this.props.audio ?
                            <div style={{ display: 'inline-block', padding: 15 }}>
                                <audio controls>
                                    <source src={this.props.audio} type="audio/mp3" />
                                </audio>
                                <br /><a target="_blank" rel="noopener noreferrer" style={{ color: '#31e7b6' }} href={this.props.audio}>Download</a>
                            </div>
                            : <div />
                        } */}

                    </div>
                    <Divider style={{ margin: 16 }} />
                </div>
            )
        else return <div />
    }
}

export default App