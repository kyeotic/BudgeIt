define(['knockout'], function(ko) {
	return function User(data) {
		var self = this,
			data = data || {};

		ko.viewmodel(self, {
			id: data.id || '',
			uid: data.uid || '',
			email: data.email || '',
			password: '',
			gravatarHash: data.md5_hash || '',
			token: data.firebaseAuthToken || '',
			provider: data.provider || ''
		}, true);
	}
});