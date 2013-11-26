define(['knockout', 'Q', 'plugins/router', 'durandal/app', 'services/firebase', 'firebaseAuth', 'models/user'], 
function (ko, Q, router, app, firebase, firebaseAuth, User) {

	var loggedInUser = ko.observable(null);
	var isLoggedIn = ko.computed(function() {
		var user = loggedInUser();
		return user !== null && user !== undefined;
	});

	var finishLogin = function(user) {

		firebase.setRoot(user.id);

		app.log('User ID: ' + user.id + ', Provider: ' + user.provider);
		loggedInUser(new User(user));
		if (authDefer && authDefer.resolve)
			authDefer.resolve(loggedInUser());
	};

	var authDefer = Q.defer(),
		auth = new firebaseAuth(firebase.source, function(error, user) {
			if (error) {
				// an error occurred while attempting login
				app.log(error);
				loggedInUser(null);
				authDefer.reject(error);
			} else if (user) {
				// user authenticated with Firebase
				finishLogin(user);
			} else {
				// user is logged out
				app.log('user logged out');
				loggedInUser(null);
				authDefer.resolve(false);
			}
			return true;
		});

	var login =  function(email, password, rememberMe) {

		//Making a new one is a bit dangerous, I think
		//But really it should only be possible to call this once
		//Either it will auto fire, or login will be inaccessible
		authDefer =  Q.defer();
		auth.login('password', { email: email, password: password, rememberMe: rememberMe});

		return authDefer.promise;
	};

	var createUser = function(email, password) {
		var createDefer = Q.defer();
		
		auth.createUser(email, password, function(error, user) {
			if (error)
				createDefer.reject(error);
			else {
				finishLogin(user);
				createDefer.resolve(user);				
			}
		});

		return createDefer.promise;
	};

	var isUsernameAvailable = function(username) {
		//This is obviously a stub until we sort out firebase login
		var defer = Q.defer();

		setTimeout(function() {
			defer.resolve(true);
		}, 500);

		return defer.promise;
	};

	var logout = function(){
		//Logout of firebase
		auth.logout();
		/*
			Logout navigates to the homepage after logging out to clear the app
			If we forget to unload something, we could leave sensitive data in memory
			By navigating, we safely ensure that the entire app restarts,
			without needed to clutter our app code with "unload on logout" bits
		*/
		window.location.href = "/";
	};

	return {
		activate: function() {
			return authDefer.promise;
		},
		login: login,
		createUser: createUser,
		isLoggedIn: isLoggedIn,
		loggedInUser: loggedInUser,
		isUsernameAvailable: isUsernameAvailable,		
		logout: logout
	};
});