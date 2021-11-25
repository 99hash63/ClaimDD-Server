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
const { getDefaultProject } = require('../middleware/getDefaultProject');

router
	.route('/')
	.post(protect, getDefaultProject, addContractParticular)
	.get(protect, getDefaultProject, getContractParticulars);

router
	.route('/:id')
	.get(protect, getContractParticular)
	.put(protect, updateContractParticular)
	.delete(protect, deleteContractParticular);

module.exports = router;
