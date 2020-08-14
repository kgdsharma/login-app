import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { verifyVoiceSignature } from '../services/AuthService';
import MediaStreamRecorder from 'msr';

class VoiceLogin extends Component {
	state = { username: '', loginFailed: ''};
    
	navigate = () => {
		this.props.history.push('/dashboard');
    };
    record= (event) =>{

        const mediaConstraints = {
            audio: true,    // don't forget audio!
            video: false     // don't forget video!
        };

        navigator.getUserMedia(mediaConstraints,(stream)=>{
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav';
            mediaRecorder.ondataavailable =  (blob) =>{
                blob.lastModifiedDate = new Date();
                blob.name = 'verifysignature.wav';

                 var bodyFormData = new FormData();
                 console.log('userid>> ', this.state.username);
                 bodyFormData.append('userId', this.state.username);
                 bodyFormData.append('phrase', 'Login for secure services please');
                 bodyFormData.append('recording', blob);               
                verifyVoiceSignature(bodyFormData,(res)=>{
                    const voiceSignatureResponse = JSON.parse(res);
                    console.log('responseCode  ', voiceSignatureResponse.responseCode);
                    if(voiceSignatureResponse.responseCode === 'SUCC'){
                        this.navigate();
                        this.setState({loginFailed:false})
                    }else{
                        this.setState({loginFailed:true});
                    }
                    console.log('Verify Response', res);
                })
                mediaRecorder.stop();
            }
            mediaRecorder.start(5000);
        },(err)=>{
            console.log(err);
        })

    }

	render() {
        if(this.state.loginFailed){
            return(

                <div className="ui segment ">
				<div className="header">
					<h2>Login with you voice</h2>
				</div><br/>
                <div className="ui compact message">
					<h3>Voice Authentication is failed ! Please re-try</h3>
				</div>
				<br />
				<form className="ui form">
					<div className="six wide field">
						<input
							type="text"
							id="username"
							placeholder="Username"
							value={this.state.username}
							onChange={(e) => this.setState({ username: e.target.value })}
						/>
					</div>
					<div className="field"></div>
                    <i className='microphone huge icon' style = {{marginLeft:'150px'}} onClick={this.record}></i>
				</form>
			</div>

            );
        }
		return (
			<div className="ui segment ">
				<div className="header">
					<h2>Login with you voice</h2>
				</div>
				<br />
				<form className="ui form">
					<div className="six wide field">
						<input
							type="text"
							id="username"
							placeholder="Username"
							value={this.state.username}
							onChange={(e) => this.setState({ username: e.target.value })}
						/>
					</div>
					<div className="field"></div>
                    <i className='microphone huge icon' style = {{marginLeft:'150px'}} onClick={this.record}></i>
				</form>
			</div>
		);
	}
}

export default VoiceLogin;
