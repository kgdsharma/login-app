import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login'
import LoginConfirm from './LoginConfirm'
import AuthnConfirm from './AuthnConfirm'
import Dashboard from './Dashboard'

//const Dashboard = ()=>{ return <div>Hi Dashboard</div>}


class App extends Component {
	render() {
		return (
			<div className="ui container" style={{marginTop:'100px'}}>
				<BrowserRouter>
					<div>
						<Switch>
							<Route  exact path ="/login/confirm/:sid" component={LoginConfirm} />
							<Route path="/login" component={Login} />
							<Route path="/auth/confirm/:sid" component={AuthnConfirm} />
							<Route path="/dashboard" component={Dashboard} />
						</Switch>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
