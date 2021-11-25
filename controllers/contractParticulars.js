const router = require('express').Router();
const ContractParticular = require('../models/ContractParticular');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');

//@route    POST /api/v1/contractParticular/
//@desc     Save new contract particular to the database or updating the existing one
//@access   private
exports.addContractParticular = asyncHandler(async (req, res, next) => {
	req.body.project = req.defaultProject;
	//verifying that project exists in the db
	const project = await Project.findById(req.body.project);

	if (project == null) {
		return next(new ErrorResponse('This project does not exists!', 400));
	}

	req.body.user = req.user;

	//checking whether a contract particular document for this specific project already exists in the db
	const existingContractParticular = await ContractParticular.findOne({
		project: req.body.project,
	});

	if (existingContractParticular) {
		await ContractParticular.findByIdAndUpdate(
			existingContractParticular._id,
			req.body
		);
		res.status(200).json({ success: true, msg: 'contractParticular Updated' });
	} else {
		const newContractParticular = new ContractParticular(req.body);
		await newContractParticular.save();
		res.status(200).json({ success: true, msg: 'contractParticular Added' });
	}
});

//@desc Get specific project's contractParticulars
//@route GET /api/v1/contractParticular/
//@access private
exports.getContractParticulars = asyncHandler(async (req, res, next) => {
	const project = req.defaultProject;

	const contractParticulars = await ContractParticular.findOne({ project });

	if (contractParticulars.length === 0) {
		return next(
			new ErrorResponse(
				'This project does not have any contractParticulars',
				400
			)
		);
	}
	res.status(200).json({
		success: true,
		data: contractParticulars,
	});
});

//@desc Get a single contractParticular
//@route GET /api/v1/contractParticular/:id
//@access public
exports.getContractParticular = asyncHandler(async (req, res, next) => {
	const contractParticular = await ContractParticular.findById(req.params.id);

	if (!contractParticular) {
		// Error if user id specified is properly formatted but still could not be found in the database
		return next(
			new ErrorResponse(
				`contractParticular not found with id of ${req.params.id}`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		data: contractParticular,
	});
});

//@desc Update a contractParticular
//@route PUT /api/v1/contractParticulars/:id
//@access private
exports.updateContractParticular = asyncHandler(async (req, res, next) => {
	req.body.user = req.user;
	const contractParticular = await ContractParticular.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!contractParticular) {
		return next(
			new ErrorResponse(
				`contractParticular not found with id of ${req.params.id}`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		data: contractParticular,
	});
});

//@desc Delete a contractParticular
//@route DELETE /api/v1/companies/:id
//@access private
exports.deleteContractParticular = asyncHandler(async (req, res, next) => {
	const contractParticular = await ContractParticular.findByIdAndDelete(
		req.params.id
	);

	if (!contractParticular) {
		return next(
			new ErrorResponse(
				`contractParticular not found with id of ${req.params.id}`,
				404
			)
		);
	}
	res.status(200).json({
		success: true,
		data: contractParticular,
	});
});
