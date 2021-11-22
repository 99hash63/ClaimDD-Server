const express = require('express');
const router = express.Router();
const {
	addContractParticular,
	getContractParticulars,
	getContractParticular,
	updateContractParticular,
	deleteContractParticular,
} = require('../controllers/contractParticulars');

const Project = require('../models/Project');
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, addContractParticular);

router.route('/projectID/:id').get(protect, getContractParticulars);

router
	.route('/:id')
	.get(protect, getContractParticular)
	.put(protect, updateContractParticular)
	.delete(protect, deleteContractParticular);

module.exports = router;
