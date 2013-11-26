define(['plugins/router', 'knockout', 'durandal/app', 'services/login'], 
function (router, ko, app, loginService) {  
    return {
        title: app.title,
        router: router,
        activate: function() {

            router.map([
                { route: '',        moduleId: 'home/index',     title: 'Home',      nav: false },
                { route: 'home',    moduleId: 'home/index',     title: 'Home',      nav: true }
            ]).buildNavigationModel();

            return router.activate();
        },
        logout: function() {
            loginService.logout();
        },
        loggedInUser: loginService.loggedInUser
    };
});