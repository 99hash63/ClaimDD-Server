const mongoose = require('mongoose');

const claimantSchema = new mongoose.Schema({
	claimantID: {
		type: String,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	nameInContract: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
});

const Claimant = mongoose.model('claimant', claimantSchema);

module.exports = Claimant;
