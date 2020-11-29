/** @format */

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { dologin } from '../services/AuthService';

class OIDCLogin extends Component {
	state = { username: '', phonenumber: '', lat: '', lng: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({ lat: position.coords.latitude });
				this.setState({ lng: position.coords.longitude });
			},
			(err) => {
				console.log(err);
			},
			{}
		);
	}

	onSubmit = (event) => {
		event.preventDefault();
		console.log(JSON.stringify(this.state));
		var confirmation = '';
		dologin(this.state, (data) => {
			this.navigate(data);
		});
	};

	navigate = (confirmation) => {
		this.props.history.push(
			'/login/confirm/' +
				confirmation +
				'/interaction' +
				this.props.match.params.intrid
		);
	};

	render() {
		return (
			<div className='ui segment '>
				<div className='header'>
					<h2>Sign In</h2>
				</div>
				<br />
				<form className='ui form' onSubmit={this.onSubmit}>
					<div className='six wide field'>
						<input
							type='text'
							id='username'
							placeholder='Username'
							value={this.state.username}
							onChange={(e) => this.setState({ username: e.target.value })}
						/>
					</div>
					<div className='six wide field'>
						<input
							type='text'
							id='phonenumber'
							placeholder='+11234567890'
							value={this.state.phonenumber}
							onChange={(e) => this.setState({ phonenumber: e.target.value })}
						/>
					</div>
					<div className='field'></div>
					<button
						className='ui primary basic button'
						style={{ marginLeft: '7%' }}>
						Login with Phone
					</button>
				</form>
			</div>
		);
	}
}

export default OIDCLogin;
