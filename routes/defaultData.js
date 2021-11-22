const express = require('express');
const router = express.Router();
const {
	addDefaultClaimant,
	getDefaultData,
	addDefaultProject,
} = require('../controllers/defaultData');

const { protect } = require('../middleware/auth');

router.route('/claimant').post(protect, addDefaultClaimant);
router.route('/project').post(protect, addDefaultProject);
router.route('/').get(protect, getDefaultData);

module.exports = router;
