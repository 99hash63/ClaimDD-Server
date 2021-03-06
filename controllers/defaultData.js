const router = require('express').Router();
const DefaultData = require('../models/DefaultData');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

//@route    POST /api/v1/defaultData/claimant
//@desc     add default claimant
//@access   private
exports.addDefaultClaimant = asyncHandler(async (req, res, next) => {
	req.body.user = req.user;

	const defaultData = await DefaultData.findOne({ user: req.body.user });

	if (defaultData) {
		await DefaultData.findByIdAndUpdate(defaultData._id, req.body);
		res.status(200).json({ success: true, msg: 'default claimant updated' });
	} else {
		await DefaultData.create(req.body);
		res.status(200).json({ success: true, msg: 'default claimant Added' });
	}
});

//@route    POST /api/v1/defaultData/project
//@desc     add default project
//@access   private
exports.addDefaultProject = asyncHandler(async (req, res, next) => {
	req.body.user = req.user;

	const defaultData = await DefaultData.findOne({ user: req.body.user });

	if (defaultData) {
		await DefaultData.findByIdAndUpdate(defaultData._id, req.body);
		res.status(200).json({ success: true, msg: 'default project updated' });
	} else {
		await DefaultData.create(req.body);
		res.status(200).json({ success: true, msg: 'default project Added' });
	}
});

//@desc Get defaul data
//@route GET /api/v1/claimant
//@access private
exports.getDefaultData = asyncHandler(async (req, res, next) => {
	userId = req.user.id;

	const defaultData = await DefaultData.findOne({ user: userId })
		.populate('claimantID')
		.populate('projectID');

	if (!defaultData) {
		return next(new ErrorResponse('no default records', 400));
	}
	res.status(200).json({
		success: true,
		data: defaultData,
	});
});

//@desc delete default project
//@route DELETE$ /api/v1/defaultData/project
//@access private
exports.removeDefaultProject = asyncHandler(async (req, res, next) => {
	req.body.user = req.user;

	const exists = await DefaultData.findOne({ projectID: { $exists: true } });
	if (exists == null) {
		return res.status(400).json({ success: true, msg: 'no default project' });
	}

	const defaultData = await DefaultData.findOne({ user: req.body.user });

	if (defaultData) {
		await DefaultData.findByIdAndUpdate(defaultData._id, {
			$unset: { projectID: 1 },
		});
		res.status(200).json({ success: true, msg: 'default project removed' });
	} else {
		res.status(200).json({ success: true, msg: 'no default project already' });
	}
});
