"use strict";
var url, mongoose, Schema, SayingSchema, Saying, copySaying, createSaying, upsertSaying, getAllSayings;
url = 'mongodb://localhost/pardonmyfrench';
mongoose = require('mongoose');
mongoose.connect(url);
Schema = mongoose.Schema;
SayingSchema = new Schema({
	text: { type: String, required: true },
});
Saying = mongoose.model('Saying', SayingSchema);

copySaying = function (to, from) {
	to.text = from.text;
	return to;
};
createSaying = function (saying) {
	var result;
	result = {};
	result._id = saying._id;
	return copySaying(result, saying);
};
upsertSaying = function (id, saying, callback) {
	Saying.findById(id, function (err, found) {
		if (!found) {
			found = new Saying(createSaying(saying));
		} else {
			found = copySaying(found, saying);
		}
		found.save(function (err) {
			if (err) {
				throw err;
			}
		});
		callback();
	});
};
getAllSayings = function(callback){
	Saying.find( {}, 
		function (err, sayings) {
			if (err) {
				throw err;
			}
			callback(sayings);
		})
};
exports.Saying = Saying;
exports.upsertSaying = upsertSaying;
exports.getAllSayings = getAllSayings;