"use strict";
exports.model = function (mongoose, url) {
	var Schema = mongoose.Schema,
		sayingmodel = require('./sayingmodel').sayingmodel(mongoose, Schema);
	mongoose.connect(url);
	return { sayingmodel : sayingmodel}
};