const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const DefaultData = require('../models/DefaultData');

//@desc Get defaul data
//@route GET /api/v1/claimant
//@access private
exports.getDefaultProject = asyncHandler(async (req, res, next) => {
	userId = req.user.id;

	const defaultData = await DefaultData.findOne({ user: userId });

	if (!defaultData) {
		return next(new ErrorResponse('no default records', 400));
	}

	projectID = defaultData.projectID;
	if (!defaultData) {
		return next(new ErrorResponse('no default project', 400));
	}

	req.defaultProject = defaultData.projectID;
	next();
});
