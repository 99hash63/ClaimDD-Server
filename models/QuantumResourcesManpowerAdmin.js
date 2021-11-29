const mongoose = require('mongoose');

const quantumResourcesManpowerAdminSchema = new mongoose.Schema({
	resourceId: {
		type: String,
	},

	resourceName: {
		type: String,
	},

	dateAndValue: [
		{
			date: { type: Date },
			value: { type: Number },
		},
	],

	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'project',
	},
});

const QuantumResourcesManpowerAdmin = mongoose.model(
	'quantumResourcesManpowerAdmin',
	quantumResourcesManpowerAdminSchema
);

module.exports = QuantumResourcesManpowerAdmin;
