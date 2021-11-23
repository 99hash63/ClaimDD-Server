const express = require('express');
const router = express.Router();
const {
	addDefaultClaimant,
	getDefaultData,
	addDefaultProject,
	removeDefaultProject,
} = require('../controllers/defaultData');

const { protect } = require('../middleware/auth');

router.route('/claimant').post(protect, addDefaultClaimant);
router
	.route('/project')
	.post(protect, addDefaultProject)
	.delete(protect, removeDefaultProject);
router.route('/').get(protect, getDefaultData);

module.exports = router;
