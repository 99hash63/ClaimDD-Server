const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
	rateID: {
		type: String,
		unique: true,
	},
	item: {
		type: String,
		required: true,
	},

	ratePerDay: {
		type: number,
	},

	unit: {
		type: String,
	},
	rateType: {
		type: String,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'project',
	},
});

const Rate = mongoose.model('rate', rateSchema);

module.exports = Rate;
