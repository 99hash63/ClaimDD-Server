const express = require('express');
const router = express.Router();
const {
	addClaimant,
	getClaimants,
	getClaimant,
	updateClaimant,
	deleteClaimant,
} = require('../controllers/claimants');

const Claimant = require('../models/Claimant');
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, addClaimant).get(protect, getClaimants);

router
	.route('/:id')
	.get(protect, getClaimant)
	.put(protect, updateClaimant)
	.delete(protect, deleteClaimant);

module.exports = router;
