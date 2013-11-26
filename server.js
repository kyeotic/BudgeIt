var fs = require('fs'),
    port = process.env.PORT || 3000;

require('sugar');
var express = require('express'),
    app = express();

var dir = __dirname + '/client/';

//Configure
app.configure(function() {    
    app.set('views', __dirname + '/views/');
    app.engine('.html', require("./app_modules/htmlEngine.js")({ port: port}));
    app.set('view engine', 'html');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express['static'](dir));
    app.use(app.router); 
});

// Routes
require('./routes')(app);

//Start Listening
app.listen(port);
console.log("Express server listening on port %d in %s mode", port, app.settings.env);