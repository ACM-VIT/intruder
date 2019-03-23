import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Editor from './editor'
import Resources from './resources'
import { connect } from 'react-redux'
import { submitResponse, sendMsg, updateCode } from '../../../../actions/userFunc'
import '../panel.css'
require('../style.css')

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorVal: '// Clear this and type your answer here...',
			successMsg: ''
		}

	}

	submit() {
		this.props.submitResponse(this.props.socket, this.props.code)
	}

	render() {
		return (
			<div id="panel">
				<div id="innerPanel">
					<div className="pannelLeft">
						<Card className="animated bounceInUp" style={{ display: 'block', background: '#454545', color: '#fff' }}>
							<CardContent className="autoHigh" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 156px)', padding: 16, textAlign: 'left', position: 'relative' }}>
								<Resources
									img={this.props.img}
									audio={this.props.audio}
									video={this.props.video}
									txt={this.props.txt}
								/>
								<div style={{ position: 'relative' }}>
									<Typography color="textSecondary" gutterBottom style={{ position: 'absolute', color: '#31e7b6', fontWeight: 'bold' }}>
										Question</Typography>
									<div style={{ margin: '40px', overflow: 'auto' }}>

										<pre style={{ fontSize:18,margin: 0, textAlign:'justify' ,whiteSpace: 'pre-wrap', color: '#fff', padding: '0px' }}>
											{this.props.ques}
										</pre>
									</div>
								</div>
							</CardContent>
						</Card >
					</div>
					<div className="pannelRight">
						<Card className="animated bounceInUp" style={{ display: 'block', background: '#454545', color: '#fff' }}>
							<CardContent style={{ padding: 0, textAlign: 'left', position: 'relative' }}>
								{/* <Typography color="textSecondary" gutterBottom style={{ position: 'absolute', color: '#31e7b6', fontWeight: 'bold' }}>
									Answer</Typography>
								<div style={{ margin: '40px', overflow: 'auto' }}> */}
								<Editor
									cipher={this.props.cipher}
									value={this.props.code}
									onChange={this.props.updateCode}
									lock={this.props.lock}
								/>
								<Button
									variant="contained"
									style={{
										height:43,
										fontWeight:600,
										borderRadius: 0,
										width: '100%',
										margin: 'auto',
										backgroundColor: '#31e7b6',
										color: '#373d41',
										pointerEvents: this.props.lock ? 'none' : 'auto'
									}} size="medium" color="primary"
									onClick={this.submit.bind(this)}
								>
									{this.props.lock ? 'Locked!' : 'Submit'}
								</Button>
								{/* </div> */}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	var { ques, img, audio, video, cipher, txt, code } = state.quesState
	var { lock, success, socket } = state.appState
	return ({ ques, img, audio, video, cipher, txt, lock, success, socket, code })
}

export default connect(mapStateToProps, { submitResponse, sendMsg, updateCode })(App)