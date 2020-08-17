import React, { Component } from 'react';
import MediaStreamRecorder from 'msr';
import { registerUser, enrollVoiceSignature } from '../services/AuthService';

class VoiceProfile extends Component {
	state = {
		userid: '',
		mfoneclass: 'microphone huge icon',
		phrase1icon: 'spinner large icon',
		phrase2icon: 'spinner large icon',
		phrase3icon: 'spinner large icon',
		count: 0,
	};
	componentDidMount() {
		registerUser('madhur123', (data) => {
			let userInfo = JSON.parse(data);
			console.log('username', userInfo.data.userId);
			this.setState({ userid: userInfo.data.userId });
		});
	}

	record = (event) => {
		this.setState({ mfoneclass: 'spinner huge icon' });

		const mediaConstraints = {
			audio: true, // don't forget audio!
			video: false, // don't forget video!
		};
		navigator.getUserMedia(
			mediaConstraints,
			(stream) => {
				const mediaRecorder = new MediaStreamRecorder(stream);
				mediaRecorder.mimeType = 'audio/wav';
				mediaRecorder.ondataavailable = (blob) => {
					blob.lastModifiedDate = new Date();
					blob.name = 'speechsignature.wav';
					var bodyFormData = new FormData();
					bodyFormData.append('userId', this.state.userid);
					bodyFormData.append('phrase', 'Login for secure services please');
					bodyFormData.append('recording', blob);
					this.setState({ mfoneclass: 'microphone huge icon' });
					enrollVoiceSignature(bodyFormData, (res) => {
						const voiceSignatureEnrollmentResponse = JSON.parse(res);
						if (voiceSignatureEnrollmentResponse.responseCode === 'SUCC') {
							this.togglePhraseIcon();
						}
						console.log('enrollment response', res);
					});
					mediaRecorder.stop();
				};
				mediaRecorder.start(5000);
			},
			(err) => {
				console.log(err);
			}
		);
	};

	togglePhraseIcon = () => {
		if (this.state.count === 0) {
			this.setState({ phrase1icon: 'check circle outline large icon' });
		}
		if (this.state.count === 1) {
			this.setState({ phrase2icon: 'check circle outline large icon' });
		}
		if (this.state.count === 2) {
			this.setState({ phrase3icon: 'check circle outline large icon' });
		}
		const setCount = this.state.count + 1;
		this.setState({ count: setCount });
	};
	render() {
		return (
			<div className="ui segment ">
				<div className="header">
					<h2>Voice Profile</h2>
				</div>
				<div
					className="ui cards"
					style={{ marginTop: '70px', marginLeft: '150px' }}
				>
					<div
						className="cards"
						style={{ marginTop: '50px', marginLeft: '30px' }}
					>
						<div class="ui label">
							<i class="user circle large icon"></i>
							{this.state.userid}
						</div>
						<br />
						<br />
						<div class="ui label"> Please record the phrase 3 times.</div>

						<div class="ui list">
							<div class="item">
								<i class={this.state.phrase1icon}></i>Login for secure services
								please.
							</div>
							<div class="item">
								<i class={this.state.phrase2icon}></i>Login for secure services
								please.
							</div>
							<div class="item">
								<i class={this.state.phrase3icon}></i>Login for secure services
								please.
							</div>
						</div>
						<div style={{ marginTop: '200px', marginLeft: '80px' }}>
							<i
								className={this.state.mfoneclass}
								style={{ color: '#FF8000' }}
								onClick={this.record}
							></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default VoiceProfile;
