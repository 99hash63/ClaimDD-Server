const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	projectID: {
		type: String,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},

	claimant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'claimant',
	},

	//SET
	dateFormat: {
		type: String,
	},
	currencyFormat: {
		type: String,
	},
	decimalDisplay: {
		type: String,
	},
	contractAs: {
		type: String,
	},
	claimantAs: {
		type: String,
	},
	defendantAs: {
		type: String,
	},
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
