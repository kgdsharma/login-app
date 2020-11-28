/** @format */

import axios from 'axios';

//const VOICE_API = process.env.VOICE_API_BASE_URL

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
async function userinfo(sessionId, callback) {
	let url = '/api/userinfo?id=' + sessionId;
	let response = await fetch(url);
	let userinfo = await response.text();
	callback(userinfo);
}

async function registerUser(username, callback) {
	const userName = {
		userName: username,
	};
	//console.log(JSON.stringify(request));
	await axios
		.post(
			'/voice-api/v1/user/register',
			{ headers: { 'Access-Control-Allow-Origin': '*' } },
			JSON.stringify(userName)
		)
		.then((res) => {
			console.log(JSON.stringify(res));
			callback(JSON.stringify(res));
		});
}

async function enrollVoiceSignature(request, callback) {
	var requestt = new XMLHttpRequest();

	requestt.onreadystatechange = function () {
		if (requestt.readyState == XMLHttpRequest.DONE) {
			callback(requestt.responseText);
		}
	};
	requestt.open(
		'POST',
		'/voice-api/v1/user/enroll'
	);
	requestt.setRequestHeader('Access-Control-Allow-Origin', '*');
	requestt.send(request);
}

async function verifyVoiceSignature(request, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			callback(xhr.responseText);
		}
	};
	xhr.open('POST', '/voice-api/v1/user/verify');
	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.send(request);
}

export {
	dologin,
	confirmlogin,
	authenticate,
	userinfo,
	registerUser,
	enrollVoiceSignature,
	verifyVoiceSignature,
};
