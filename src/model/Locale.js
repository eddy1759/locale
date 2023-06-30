const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
	region: { type: String, required: true },
	state: { type: String, required: true },
	LGA: { type: [String], required: true },
	metadata: {
		slogan: { type: String, required: true },
		landmass: { type: String, required: true },
		population: { type: String, required: true },
		dialect: { type: String, required: true },
		latitude: { type: String, required: true },
		longitude: { type: String, required: true },
		createdDate: { type: String, required: true },
		createdBy: { type: String, required: true },
	},
});

const LocationModel = mongoose.model('Location', locationSchema);

module.exports = LocationModel;
