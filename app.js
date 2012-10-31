'use strict';
var local = false,
    application,
    express = require('express'),//3.0.0rc2
    fs = require('fs'),
    jade = require('jade'),//0.27.0
	mongoose = require('mongoose'),//2.7.3
	flash = require('connect-flash'),//0.1.0
    url = local ? 'mongodb://localhost/pardonmyfrench' : "mongodb://nodejitsu:cecc58baca4c975f96712ddde965ab7d@alex.mongohq.com:10079/nodejitsudb509226462710",
    routes = require('./routes'),
    config = require('./config'),
    model = require('./models/model').model(mongoose, url),
    app = module.exports = express();
config.configure(app, express, flash);
routes.initialize(app, model);
application = app.listen(3333);
if (local) {
    console.log('Express service listening on port %d, environment: %s', application.address().port, app.settings.env);
}
