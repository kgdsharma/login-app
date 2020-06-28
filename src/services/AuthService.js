import axios from 'axios';

async function dologin(request, sessionId) {
	await axios.post('/api/auth', request).then((res) => {
		sessionId(res.data);
	});
}

async function authenticate(request, sessionId) {
	console.log(JSON.stringify(request));
	await axios.post('/api/authenticate', request).then((res) => {
		console.log(JSON.stringify(res));
		sessionId(res);
	});
}

async function confirmlogin(sessionId, callback) {
	let url = '/api/auth/confirm?id=' + sessionId;
	let response = await fetch(url);

	if (response.status == 404) {
		await confirmlogin(sessionId, callback);
	} else if (response.status != 200) {
		let message = await response.text();
		console.log(message);
		await confirmlogin(sessionId, callback);
	} else {
		// Get and show the message
		let message = await response.text();
		console.log(message);
		callback(message);
	}
}

export { dologin, confirmlogin, authenticate };
