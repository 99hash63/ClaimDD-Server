const mongoose = require('mongoose');

const contractParticularSchema = new mongoose.Schema({
	nameOfDefendant: {
		type: String,
	},

	contractRef: {
		type: String,
	},

	currency: {
		type: String,
	},
	originalContractPrice: {
		type: Number,
	},
	durationUnit: {
		type: String,
	},
	originalContractDuration: {
		type: Number,
	},
	commencementDate: {
		type: Date,
	},
	workingHours: {
		type: Number,
	},
	claimCause: {
		type: [String],
	},
	projectStatus: {
		type: String,
	},
	latestAmendmentReference: {
		type: String,
	},
	revisedContractPrice: {
		type: Number,
	},
	revisedContractDuration: {
		type: Number,
	},

	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'project',
	},
});

const ContractParticular = mongoose.model(
	'contractParticular',
	contractParticularSchema
);

module.exports = ContractParticular;
