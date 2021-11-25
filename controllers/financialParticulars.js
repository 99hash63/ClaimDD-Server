const router = require('express').Router();
const FinancialParticular = require('../models/FinancialParticular');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');

//@route    POST /api/v1/financialParticular/
//@desc     Save new movie to the database
//@access   private
exports.addFinancialParticular = asyncHandler(async (req, res, next) => {
	//verifying that claimant exists in the db
	req.body.project = req.defaultProject;

	const project = await Project.findById(req.body.project);

	if (project == null) {
		return next(new ErrorResponse('This project does not exists!', 400));
	}
	req.body.user = req.user;

	//checking whether a financial particular document for this specific project already exists in the db
	const existingFinancialParticular = await FinancialParticular.findOne({
		project: req.body.project,
	});

	if (existingFinancialParticular) {
		await FinancialParticular.findByIdAndUpdate(
			existingFinancialParticular._id,
			req.body
		);
		res.status(200).json({ success: true, msg: 'financialParticular Updated' });
	} else {
		const newFinancialParticular = new FinancialParticular(req.body);
		await newFinancialParticular.save();
		res.status(200).json({ success: true, msg: 'financialParticular Added' });
	}
});

//@desc Get specific project's financialParticulars
//@route GET /api/v1/financialParticular/
//@access private
exports.getFinancialParticulars = asyncHandler(async (req, res, next) => {
	const project = req.defaultProject;

	const financialParticulars = await FinancialParticular.findOne({ project });

	if (!financialParticulars) {
		return next(
			new ErrorResponse(
				'This project does not have any financialParticulars',
				400
			)
		);
	}
	res.status(200).json({
		success: true,
		data: financialParticulars,
	});
});

//@desc Get a single financialParticular
//@route GET /api/v1/financialParticular/:id
//@access public
exports.getFinancialParticular = asyncHandler(async (req, res, next) => {
	const financialParticular = await FinancialParticular.findById(req.params.id);

	if (!financialParticular) {
		// Error if user id specified is properly formatted but still could not be found in the database
		return next(
			new ErrorResponse(
				`financialParticular not found with id of ${req.params.id}`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		data: financialParticular,
	});
});

//@desc Update a financialParticular
//@route PUT /api/v1/financialParticulars/:id
//@access private
exports.updateFinancialParticular = asyncHandler(async (req, res, next) => {
	req.body.user = req.user;
	const financialParticular = await FinancialParticular.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!financialParticular) {
		return next(
			new ErrorResponse(
				`financialParticular not found with id of ${req.params.id}`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		data: financialParticular,
	});
});

//@desc Delete a financialParticular
//@route DELETE /api/v1/companies/:id
//@access private
exports.deleteFinancialParticular = asyncHandler(async (req, res, next) => {
	const financialParticular = await FinancialParticular.findByIdAndDelete(
		req.params.id
	);

	if (!financialParticular) {
		return next(
			new ErrorResponse(
				`financialParticular not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({
		success: true,
		data: financialParticular,
	});
});
