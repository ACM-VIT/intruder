import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

class App extends React.Component {
    render(){
        return(
            <div style={{display:'block'}}>

                <Divider/>
                <Typography color="textSecondary" style={{textAlign:'left',color:'#31e7b6',fontWeight:'bold'}}>
                    Resources<br/>
                </Typography>
                <div>
                    <div style={{display:'inline-block', padding:15}}>
                        <img style={{maxWidth:'100%',maxHeight:'200px'}} src='https://www.faitron.com/wp-content/uploads/2018/08/dummy.jpg'/>
                        <br/><a style={{color:'#31e7b6'}} href="#">Download</a>
                    </div>
                    <div style={{display:'inline-block', padding:15}}>
                        <video style={{maxWidth:'100%',maxHeight:'200px'}} controls>
                            <source src="http://techslides.com/demos/sample-videos/small.mp4" type="video/mp4"/>
                        </video>
                        <br/><a style={{color:'#31e7b6'}} href="#"> Download</a>
                    </div>
                    <div style={{display:'inline-block',padding:15}}>
                        <audio controls>
                        <source src="https://9.cdn.music-cdn.com/audio/eyJpdiI6Im1adUhpbUVnRjhiekdoMElwbHFwMkE9PSIsInZhbHVlIjoiVEY3SnJPb2Rnc1N2Yk1aRXJoMnJiRWhuTkFDM2dlQndBMyt4cERqK2JpZDRYcWpLamIzNHdqYnpOWEl3RDdHY29ZS3Z2OUN0RmNjWlwvVVZ4ZlBHOGNlU2dLRkxjQ2FJeFFLYVRNTXhzSUJhajZwVmFQN0FFZG9mWTdjVEhFOUdHSUJtTDB2MEIrY093T2I2eWJXdHhRSnNDUkJuaTI2eFVBM1NFRzVZalRBdDhSMWRxdEFJQ2hyakEzc3kzUkJ6VzFJZmJiVSt6VFJPV1VkeVpVWXJBNUl3Sk5qV1NxazBwMDdRRWNlQlwvRjJKYWJjRVJjVXc4cUljMkZBUU8rbG5FIiwibWFjIjoiNzE5ZTU4YzZiOTJkZjA0N2YwNjg0N2VhYmI0OTAzODk0NjllNjk2NWYxMDU4MzI1YzJlZTk3OWFhNmRiZjUyNiJ9" type="audio/mp3"/>
                        </audio>
                        <br/><a style={{color:'#31e7b6'}} href="#">Download</a>
                    </div>
                    <div style={{textAlign:'left',width:'80%', margin:'auto',backgroundColor:'rgb(48, 48, 48)',padding:10, border:'1px solid #efefef'}}>
                        <pre style={{whiteSpace: 'pre-wrap'}}>
{`preFormated Text Supports line change and tabs

a=()=>{
    console.log('hello')
}
`}
                        </pre>
                    </div>
                </div>
            </div>
        )
    }
}

export default App