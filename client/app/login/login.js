define(['durandal/app', 'knockout', 'services/login', 'Q'], 
function (app, ko, loginService, Q) {

    var finishLogin = function() {
        app.setRoot('shell/shell');
    };
    
    var LoginViewModel = function() {
        var self = this;
        self.display = ko.observable(false);
        
        self.email = ko.observable("");
        self.password = ko.observable("");
        self.rememberMe = ko.observable(false);

        self.activate = function() {
            return loginService.activate().then(function(result) {
                if (result) {
                    finishLogin();
                    return false;
                }
                self.display(true);
            });
        };
        
        self.resetForm = function() {
            self.email("");
            self.password("");
            //Don't reset rememberMe, this should stick
        };

        self.loginFailed = ko.observable(false);
        self.loginFailed.subscribe(function(newValue) {
            if (newValue)
                setTimeout(function() {
                    self.loginFailed(false);
                }, 2000);
        });
        
        self.login = ko.promiseCommand({
            execute: function(){
                return loginService.login(self.email(), self.password(), self.rememberMe())
                    .then(function(result) {
                        if (!result) {
                            self.loginFailed(true);
                            self.password('');
                            return false;
                        }
                        finishLogin();
                    });
            },
            canExecute: function(isExecuting) {
                return !isExecuting
                    && self.password().length > 0
                    && self.email().length > 0;
            }
        });
        
        self.createUser = ko.promiseCommand({
            execute: function() {
                return loginService.createUser(self.email(), self.password())
                    .then(function(result) {
                        if (!result) {
                            self.createUserFailed(true);
                            return false;
                        }
                        finishLogin();
                    })
                    .fail(function(error) {
                        app.log(error);
                        window.errorTest = error;
                        self.createUserFailed(true);
                    });
            },
            canExecute: function(isExecuting) {
                return !isExecuting
                    && self.password().length > 0
                    && self.email().length > 0;
            }
        });

        self.createUserFailed = ko.observable(false);
        self.createUserFailed.subscribe(function(newValue) {
            if (newValue)
                setTimeout(function() {
                    self.createUserFailed(false);
                }, 2000);
        });

        self.errorMessage = ko.computed(function() {
            var loginFailed = self.loginFailed(),
                createFailed = self.createUserFailed();

            if (loginFailed)
                return 'Incorrect Credentials';
            else if (createFailed)
                return 'Unable to create user';
            else
                return '';
        });
    };

    //if (loginService.isLoggedIn())
    //    finishLogin();

    return new LoginViewModel();
});