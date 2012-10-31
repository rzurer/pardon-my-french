"use strict";
exports.sayingmodel = function (mongoose, Schema) {
	var SayingSchema = new Schema({
			text: { type: String, required: true },
		}),
		Saying = mongoose.model('Saying', SayingSchema),
		copySaying = function (to, from) {
			to.text = from.text;
			return to;
		},
		constructSaying = function (saying) {
			if (!saying) {
				return;
			}
			var result;
			result = {};
			result._id = saying._id;
			return copySaying(result, saying);
		},
		that = {
			createSaying : function (saying) {
				return new Saying(constructSaying(saying));
			},
			upsertSaying : function (id, saying, callback) {
				Saying.findById(id, function (err, found) {
					if (!found) {
						found = that.createSaying(saying);
					} else {
						found = copySaying(found, saying);
					}
					found.save(function (err) {
						if (err) {
							throw err;
						}
						callback();
					});
				});
			},
			getAllSayings : function (callback) {
				Saying.find({},
					function (err, sayings) {
						if (err) {
							throw err;
						}
						callback(sayings);
					});
			}
		};
	return that;
};