'use strict';
var baseDir, express, routes, config, webServer, http, model;

	baseDir = __dirname,
    express = require('express'),
    model = require('./saying'),
    config = require('./config'),
    routes = require('./routes'),
    webServer = module.exports = express.createServer(); 
config.configure(webServer, express, baseDir);
routes.initialize(webServer, model);

webServer.listen(3333);
console.log('Express server listening on port %d, environment: %s', webServer.address().port, webServer.settings.env)
console.log('Using Express %s', express.version);