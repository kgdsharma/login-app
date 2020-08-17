import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { verifyVoiceSignature } from '../services/AuthService';
import MediaStreamRecorder from 'msr';

class VoiceLogin extends Component {
	state = { username: '', loginFailed: '', microphonestate:'', mphoneClass:'microphone huge icon'};
	
    
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
			this.setState({microphonestate:'inactive'});
			this.toggleMicrofone();
            mediaRecorder.ondataavailable =  (blob) =>{
                blob.lastModifiedDate = new Date();
                blob.name = 'verifysignature.wav';

                var bodyFormData = new FormData();
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
						this.setState({microphonestate:'active'})
						this.toggleMicrofone();
                    }
					console.log('Verify Response', res);
                })
                mediaRecorder.stop(6000);
            }
            mediaRecorder.start(2000);
        },(err)=>{
            console.log(err);
        })

	}
	
	toggleMicrofone = ()=>{
		if (this.state.microphonestate === 'inactive'){
			this.setState({mphoneClass:'spinner huge icon'})
		} else{
			this.setState({mphoneClass:'microphone huge icon'})
		}
	}

	render() {
		if(this.state.loginFailed)
		{
            return(

                <div className="ui segment ">
				<div className="header">
					<h2>Voice Login</h2>
				</div><br/>
                <div style={{color:'#B40404'}}>
					<h5>Voice isn't recognized. Please try again !</h5>
				</div>
				<br /><br/>
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
                    <i className={this.state.mphoneClass} style = {{marginLeft:'70px', color:'#FF8000'}} onClick={this.record}></i>
				</form>
			</div>

            );
        }
		return (
			<div className="ui segment ">
				<div className="header">
					<h2>Voice Login</h2>
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
                    <i className={this.state.mphoneClass} style = {{marginLeft:'70px', color:'#FF8000'}} onClick={this.record}></i>
				</form>
			</div>
		);
	}
}

export default VoiceLogin;
