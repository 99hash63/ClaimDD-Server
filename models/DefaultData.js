const mongoose = require('mongoose');

const defaultDataSchema = new mongoose.Schema({
	claimantID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'claimant',
	},
	projectID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'project',
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
});

const DefaultData = mongoose.model('defaultData', defaultDataSchema);

module.exports = DefaultData;
