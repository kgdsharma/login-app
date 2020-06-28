// post login a dashboard for user
import React, { Component } from 'react';

class Dashboard extends Component {
	render() {
		return (
			<div className="ui cards">
				<div className="card">
					<div className="header">
						<h3>Profile.</h3>
					</div>
					<div className="meta">Dear, Customer</div>
					<div className="description">Here is your profile</div>
				</div>
				<div className="card">
					<div className="header">
						<h3>Account Dashboard.</h3>
					</div>
					<div className="meta">Dear, Customer</div>
					<div className="description">Here is the account dashboard</div>
				</div>
				<div className="card">
					<div className="header">
						<h3>Account Activities.</h3>
					</div>
					<div className="meta">Dear, Customer</div>
					<div className="description">
						Here are the most recent account activities
					</div>
				</div>

                <div className="card">
					<div className="header">
						<h3>Offers</h3>
					</div>
					<div className="meta">Dear, Customer</div>
					<div className="description">
						These are the amazing offers we have for you !!.
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
