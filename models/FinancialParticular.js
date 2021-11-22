const mongoose = require('mongoose');

const financialParticularsSchema = new mongoose.Schema({
	hoOverheadPercentage: {
		type: Number,
	},

	profitPercentage: {
		type: Number,
	},

	yearlyInterest: {
		type: Number,
	},
	interestType: {
		type: String,
	},
	compoundingPeriod: {
		type: String,
	},
	annualTurnover: {
		type: Number,
	},
	annualHOOC: {
		type: Number,
	},
	annualProfit: {
		type: Number,
	},
	actualTurnover: {
		type: Number,
	},
	actualHOOC: {
		type: Number,
	},
	actualProfit: {
		type: Number,
	},
	hoOverheadAndProfitFromula: {
		type: String,
	},
	hoOverheadCostPerDay: {
		type: Number,
	},
	profitAmountPerDay: {
		type: Number,
	},

	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'project',
	},
});

const FinancialParticulars = mongoose.model(
	'financialParticulars',
	financialParticularsSchema
);

module.exports = FinancialParticulars;
