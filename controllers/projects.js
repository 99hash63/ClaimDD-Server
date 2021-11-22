const router = require('express').Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Claimant = require('../models/Claimant');

//@route    POST /api/v1/project/
//@desc     Save new movie to the database
//@access   private
exports.addProject = asyncHandler(async (req, res, next) => {
	//verifying that claimant exists in the db
	const claimant = await Claimant.findById(req.body.claimant);

	if (claimant == null) {
		return next(new ErrorResponse('This claimant does not exists!', 400));
	}
	req.body.user = req.user;
	const newProject = new Project(req.body);
	await newProject.save();
	res.status(200).json({ success: true, msg: 'project Added' });
});

//@desc Get specific claimants's projects
//@route GET /api/v1/project/
//@access private
exports.getProjects = asyncHandler(async (req, res, next) => {
	const claimant = req.params.id;

	const projects = await Project.find({ claimant });

	if (projects.length === 0) {
		return next(
			new ErrorResponse('This claiamnt does not have any projects', 400)
		);
	}
	res.status(200).json({
		success: true,
		data: projects,
	});
});

//@desc Get a single project
//@route GET /api/v1/project/:id
//@access public
exports.getProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findById(req.params.id);

	if (!project) {
		// Error if user id specified is properly formatted but still could not be found in the database
		return next(
			new ErrorResponse(`project not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: project,
	});
});

//@desc Update a project
//@route PUT /api/v1/projects/:id
//@access private
exports.updateProject = asyncHandler(async (req, res, next) => {
	req.body.user = req.user;
	const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!project) {
		return next(
			new ErrorResponse(`project not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: project,
	});
});

//@desc Delete a project
//@route DELETE /api/v1/companies/:id
//@access private
exports.deleteProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findByIdAndDelete(req.params.id);

	if (!project) {
		return next(
			new ErrorResponse(`project not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		success: true,
		data: project,
	});
});
