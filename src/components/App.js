import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login'
import LoginConfirm from './LoginConfirm'
import AuthnConfirm from './AuthnConfirm'
import Dashboard from './Dashboard'
import VoiceProfile from './VoiceProfile'
import VoiceLogin from './VoiceLogin';
import OIDCLogin from './OIDCLogin';
import OIDCLoginConfirm from './OIDCLoginConfirm';

//const Dashboard = ()=>{ return <div>Hi Dashboard</div>}


class App extends Component {
	render() {
		return (
			<div className="ui m6 container" style={{marginTop:'100px',width:'600px'}}>
				<BrowserRouter>
					<div>
						<Switch>
							<Route  exact path ="/login/confirm/:sid" component={LoginConfirm} />
							<Route  exact path ="/login/confirm/:sid/interaction/:intrid" component={OIDCLoginConfirm} />
							<Route  exact path ="/login/interaction/:intrid" component={OIDCLogin} />
							<Route path="/voice-login" component={VoiceLogin} />
							<Route path="/login" component={Login} />
							<Route path="/auth/confirm/:sid" component={AuthnConfirm} />
							<Route path="/dashboard" component={Dashboard} />
							<Route path="/voice-profile" component={VoiceProfile} />

						</Switch>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
