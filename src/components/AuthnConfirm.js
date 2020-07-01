// This component will be called by mobile app

import React, { Component } from 'react';
import { authenticate, userinfo } from '../services/AuthService';

class AuthnConfirm extends Component {
	state = { authstatus: '', username: '', location: '' };

	componentDidMount() {
		userinfo(this.props.match.params.sid, (res) => {
			let userinfo= JSON.parse(res);
			this.setState({ username: userinfo.username, location: userinfo.location });
		});
	}

	approve = (event) => {
		authenticate({ sid: this.props.match.params.sid }, (res) => {
			if (res.status === 200) {
				this.setState({ authstatus: 'Authenticated' });
			} else {
				this.setState({ authstatus: 'Not-Authenticated' });
			}
		});
	};

	render() {
		if (this.state.authstatus === 'Authenticated') {
			return (
				<div className="ui cards">
					<div className="card">
						<i
							className="massive user outline icon"
							style={{ marginLeft: '25%' }}
						></i>
						<div className="header">
							<h3>Authentication | Test Bank Inc.</h3>
						</div>
						<div className="description">Dear, {this.state.username}</div>
						<div className="description">You have been Authenticated !!!</div>
					</div>
				</div>
			);
		}
		return (
			<div className="ui cards">
				<div className="card">
					<i
						className="massive user outline icon"
						style={{ marginLeft: '25%' }}
					></i>
					<div className="header">
						<h3>Authentication | Test Bank Inc.</h3>
					</div>
					<div className="meta"><h4>Dear, {this.state.username}</h4></div>
					<div className="meta">
						<h5>Location: {this.state.location}</h5>
					</div>
					<div className="description">
						You are requesting an access to your account. Please approve/Decline
						the access request !!.
					</div>

					<div className="extra content">
						<div className="ui two buttons">
							<div className="ui basic green button" onClick={this.approve}>
								Approve
							</div>
							<div className="ui basic red button" onClick={this.deny}>
								Decline
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AuthnConfirm;
