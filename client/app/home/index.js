define(['knockout', 'durandal/app', 'services/login', 'home/bills'], 
function(ko, app, loginService, Bills) {
	return {
		greeting: 'Hello',
		bills: new Bills()
	};
});