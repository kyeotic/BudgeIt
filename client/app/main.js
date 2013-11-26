require.config({
    paths: {
        'text': '../lib/require/text',
        'durandal':'../lib/durandal/js',
        'plugins' : '../lib/durandal/js/plugins',
        'transitions' : '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout-2.3.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '//code.jquery.com/jquery-1.10.2.min',
        'Q' : '../lib/q.min',

        //External scripts
        'firebase' : '//cdn.firebase.com/v0/firebase',
        'firebaseAuth' : '//cdn.firebase.com/v0/firebase-simple-login',
        'firebind' : '//rawgithub.com/tyrsius/FireBind/master/firebind'
    },
    shim: {
        'firebase' : {
            exports: 'Firebase'
        },
        'firebaseAuth' : {
            deps: ['firebase'],
            exports: 'FirebaseSimpleLogin'
        },
        'firebind': {
            deps: ['firebase', 'knockout'],
            exports: 'ko'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    },
    waitSeconds: 30
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],
function(system, app, viewLocator) {

    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");  

    //specify which plugins to install and their configuration
    app.configurePlugins({

        //Durandal plugins
        router:true,
        dialog: true,

        //App plugins
        envPatch: true,
        knockoutExtensions: true,
        knockoutCommands: true,
        knockoutActivity: true,
        firebind: true,
        qPatch: { debugMode: false }
    });

    app.title = 'BudgeIt';
    app.start().then(function () {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        //viewLocator.useConvention();
        
        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('login/login');
    });
});