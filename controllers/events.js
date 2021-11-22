const router = require('express').Router();
const Event = require('../models/Events');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');

//@route    POST /api/v1/event/
//@desc     Save new movie to the database
//@access   private
exports.addEvent = asyncHandler(async (req, res, next) => {
	//verifying that claimant exists in the db
	const project = await Project.findById(req.body.project);

	if (project == null) {
		return next(new ErrorResponse('This project does not exists!', 400));
	}
	req.body.user = req.user;
	const newEvent = new Event(req.body);
	await newEvent.save();
	res.status(200).json({ success: true, msg: 'event Added' });
});

//@desc Get specific project's events
//@route GET /api/v1/event/
//@access private
exports.getEvents = asyncHandler(async (req, res, next) => {
	const project = req.params.id;

	const events = await Event.find({ project });

	if (events.length === 0) {
		return next(
			new ErrorResponse('This project does not have any events', 400)
		);
	}
	res.status(200).json({
		success: true,
		data: events,
	});
});

//@desc Get a single event
//@route GET /api/v1/event/:id
//@access public
exports.getEvent = asyncHandler(async (req, res, next) => {
	const event = await Event.findById(req.params.id);

	if (!event) {
		// Error if user id specified is properly formatted but still could not be found in the database
		return next(
			new ErrorResponse(`event not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: event,
	});
});

//@desc Update a event
//@route PUT /api/v1/events/:id
//@access private
exports.updateEvent = asyncHandler(async (req, res, next) => {
	req.body.user = req.user;
	const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!event) {
		return next(
			new ErrorResponse(`event not found with id of ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		data: event,
	});
});

//@desc Delete a event
//@route DELETE /api/v1/companies/:id
//@access private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
	const event = await Event.findByIdAndDelete(req.params.id);

	if (!event) {
		return next(
			new ErrorResponse(`event not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		success: true,
		data: event,
	});
});
