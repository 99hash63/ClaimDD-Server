const express = require('express');
const router = express.Router();
const {
	addEvent,
	getEvent,
	getEvents,
	updateEvent,
	deleteEvent,
} = require('../controllers/events');

const Project = require('../models/Project');
const advancedResults = require('../middleware/advancedResults');
const { protect } = require('../middleware/auth');
const { getDefaultProject } = require('../middleware/getDefaultProject');

router
	.route('/')
	.post(protect, getDefaultProject, addEvent)
	.get(protect, getDefaultProject, getEvents);

router
	.route('/:id')
	.get(protect, getEvent)
	.put(protect, updateEvent)
	.delete(protect, deleteEvent);

module.exports = router;
