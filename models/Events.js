const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	eventID: {
		type: String,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	daysOnCompletion: {
		type: Number,
		required: true,
	},
	extendedContractDuaration: {
		type: Number,
		required: true,
	},
	pevAtStart: {
		type: Number,
		required: true,
	},
	pevAtEnd: {
		type: Number,
		required: true,
	},
	aevAtStart: {
		type: Number,
		required: true,
	},
	aevAtEnd: {
		type: Number,
		required: true,
	},
	costClaimable: {
		type: String,
		required: true,
	},
	timeClaimReference: {
		type: String,
		required: true,
	},

	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'project',
	},
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
