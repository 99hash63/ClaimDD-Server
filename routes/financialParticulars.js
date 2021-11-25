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
const { getDefaultProject } = require('../middleware/getDefaultProject');

router
	.route('/')
	.post(protect, getDefaultProject, addFinancialParticular)
	.get(protect, getDefaultProject, getFinancialParticulars);

router
	.route('/:id')
	.get(protect, getFinancialParticular)
	.put(protect, updateFinancialParticular)
	.delete(protect, deleteFinancialParticular);

module.exports = router;
