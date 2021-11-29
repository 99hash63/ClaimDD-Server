const router = require('express').Router();
const Event = require('../models/Events');
const auth = require('../middleware/auth');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Project = require('../models/Project');
const QuantumResourcesManpowerAdmin = require('../models/QuantumResourcesManpowerAdmin');

//@route    POST /api/v1/quantum/resourcesManpowerAdmin
//@desc     Save new resource manpowe admin to the database
//@access   private
exports.addQuantumResourcesManpowerAdmin = asyncHandler(
	async (req, res, next) => {
		//verifying that project exists in the db
		req.body.project = req.defaultProject;

		const project = await Project.findById(req.body.project);

		if (project == null) {
			return next(new ErrorResponse('This project does not exists!', 400));
		}

		const dataObject = req.body.data;

		//record to send to db
		const qrmaRecord = {
			resourceId: '',
			resourceName: '',
			dateAndValue: [],
			project: '',
		};

		dataObject.slice(1).forEach(async (row) => {
			// console.log(row[0]);
			// console.log(row[1]);
			qrmaRecord.resourceId = row[0];
			qrmaRecord.resourceName = row[1];
			qrmaRecord.project = req.defaultProject;
			qrmaRecord.dateAndValue = [];

			let index = 0;
			row.slice(2).forEach((column) => {
				// const indexOfNull = row.indexOf(null);
				// console.log(indexOfNull);

				//converting all null values to 0
				if (column == null) {
					column = 0;
				}

				//creating date value object
				const dateAndValueObj = {
					date: '',
					value: 0,
				};
				// console.log(index + ' : ' + dataObject[0][index + 2]);
				dateAndValueObj.date = dataObject[0][index + 2];
				// console.log(index + ' : ' + column);
				dateAndValueObj.value = parseInt(column);

				console.log(dateAndValueObj);
				qrmaRecord.dateAndValue.push(dateAndValueObj);

				index++;
			});

			//save to db
			const newQuantum = await new QuantumResourcesManpowerAdmin(qrmaRecord);
			await newQuantum.save();
		});

		res.status(200).json({ success: true, msg: 'data recieved' });
		// const newQuantum = new QuantumResourcesManpowerAdmin(req.body);
		// await newQuantum.save();
		// res.status(200).json({ success: true, msg: 'quantum row Added' });
	}
);
