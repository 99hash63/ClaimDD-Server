const express = require('express');
const router = express.Router();
const {} = require('../controllers/quantum');

const { protect } = require('../middleware/auth');
const { getDefaultProject } = require('../middleware/getDefaultProject');

const { addQuantumResourcesManpowerAdmin } = require('../controllers/quantum');

router
	.route('/resourcesManpowerAdmin')
	.post(protect, getDefaultProject, addQuantumResourcesManpowerAdmin);
// .get(protect, getDefaultProject, getEvents);

module.exports = router;
