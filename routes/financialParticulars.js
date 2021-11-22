const express = require('express');
const router = express.Router();
const {
	addFinancialParticular,
	getFinancialParticular,
	getFinancialParticulars,
	updateFinancialParticular,
	deleteFinancialParticular,
} = require('../controllers/financialParticulars');

const Project = require('../models/Project');
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, addFinancialParticular);

router.route('/projectID/:id').get(protect, getFinancialParticulars);

router
	.route('/:id')
	.get(protect, getFinancialParticular)
	.put(protect, updateFinancialParticular)
	.delete(protect, deleteFinancialParticular);

module.exports = router;
