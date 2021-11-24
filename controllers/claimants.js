const router = require('express').Router();
const Claimant = require('../models/Claimant');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@route    POST /api/v1/claimant/
//@desc     Save new claimant to the database
//@access   private
exports.addClaimant = asyncHandler(async (req, res, next) => {
	req.body.user = req.user;
	const newClaimant = new Claimant(req.body);
	await newClaimant.save();
	res.status(200).json({ success: true, msg: 'Claimant Added' });
});

//@desc Get specific user's claimants
//@route GET /api/v1/claimant/
//@access private
exports.getClaimants = asyncHandler(async (req, res, next) => {
	userId = req.user.id;

	const claimants = await Claimant.find({ user: userId });

	if (claimants.length === 0) {
		return next(
			new ErrorResponse('This user does not have created any claimants', 400)
		);
	}
	res.status(200).json({
		success: true,
		data: claimants,
	});
});

//@desc Get a single claimant
//@route GET /api/v1/claimant/:id
//@access public
exports.getClaimant = asyncHandler(async (req, res, next) => {
	const claimant = await Claimant.findById(req.params.id);

	if (!claimant) {
		// Error if user id specified is properly formatted but still could not be found in the database
		return next(
			new ErrorResponse(`claimant not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: claimant,
	});
});

//@desc Update a claimant
//@route PUT /api/v1/claimants/:id
//@access private
exports.updateClaimant = asyncHandler(async (req, res, next) => {
	req.body.user = req.user;
	const claimant = await Claimant.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!claimant) {
		return next(
			new ErrorResponse(`claimant not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: claimant,
	});
});

//@desc Delete a claimant
//@route DELETE /api/v1/companies/:id
//@access private
exports.deleteClaimant = asyncHandler(async (req, res, next) => {
	const claimant = await Claimant.findByIdAndDelete(req.params.id);

	if (!claimant) {
		return next(
			new ErrorResponse(`claimant not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		success: true,
		data: claimant,
	});
});
