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

		//import month
		// const startdate = new Date(req.body.importStartDate) + 1;
		// const endDate = new Date(req.body.importEndDate) + 1;
		const importMonth = req.body.importMonth;

		// console.log(startdate);
		// console.log(endDate);

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

				if (column == null) {
					column = 0;
				}

				//creating date value object
				const dateAndValueObj = {
					date: '',
					value: 0,
				};
				// fetching date and convertong to js date
				let jsDate = new Date(dataObject[0][index + 2]);

				const date = jsDate.toLocaleString();
				const month = jsDate.toLocaleString('default', { month: 'long' });
				//converted js date
				// jsDate.setDate(jsDate.getDate());
				//month of converted date
				// let month = jsDate.getMonth();
				console.log(date);
				console.log(month);
				console.log(importMonth);
				if (month == importMonth) {
					//parsing data for date and month obj
					dateAndValueObj.date = jsDate;
					dateAndValueObj.value = parseInt(column);

					// console.log(dateAndValueObj);
					qrmaRecord.dateAndValue.push(dateAndValueObj);
				}

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
