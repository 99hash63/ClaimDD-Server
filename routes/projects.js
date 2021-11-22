const express = require('express');
const router = express.Router();
const {
	addProject,
	getProjects,
	getProject,
	updateProject,
	deleteProject,
} = require('../controllers/projects');

const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, addProject);

router.route('/claimantID/:id').get(protect, getProjects);

router
	.route('/:id')
	.get(protect, getProject)
	.put(protect, updateProject)
	.delete(protect, deleteProject);

module.exports = router;
