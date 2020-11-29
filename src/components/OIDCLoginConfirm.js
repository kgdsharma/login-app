/** @format */

//this component will be an intermediate step to
//show the page and continue to confirm Login success.

import React, { Component } from 'react';
import { confirmlogin, userinfo } from '../services/AuthService';
import { updateOIDCSession } from '../services/AuthService';

class OIDCLoginConfirm extends Component {
	componentDidMount() {
		confirmlogin(this.props.match.params.sid, (data) => {
			if (data === 'Authenticated') {
				userinfo(this.props.match.params.sid, (res) => {
					let user = JSON.parse(res);
					updateOIDCSession(
						user.username,
						this.props.match.params.intrid,
						(data) => {
							this.navigate();
						}
					);
				});
			}
		});
	}

	navigate = () => {
		window.location.href = 'https://myfinance97.herokuapp.com';
		//this.props.history.push('/dashboard');
	};

	render() {
		return (
			<div className='ui cards'>
				<div className='card'>
					<i
						className='massive mobile alternate icon'
						style={{ marginLeft: '25%' }}></i>
					<div className='header'>
						<h3>Authentication | Test Bank Inc.</h3>
					</div>
					<div className='meta'>Dear, Customer</div>
					<div className='description'>
						A text message has been sent to your mobile, Please follow the
						instructions
					</div>
				</div>
				{/* <div>confirmation number is {this.props.match.params.sid}</div> */}
			</div>
		);
		//return <div>confirmation number is {this.props.match.params.sid}</div>;
	}
}

export default OIDCLoginConfirm;
