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
		const importMonth = req.body.importMonth;
		//split year and month from importMonth
		const yearMonthArray = importMonth.split('-');
		const selectedYear = parseInt(yearMonthArray[0]);
		const selectedMonth = parseInt(yearMonthArray[1]);

		// console.log(selectedYear);
		// console.log(selectedMonth);

		for (const row of dataObject.slice(1)) {
			qrmaRecord.resourceId = row[0];
			qrmaRecord.resourceName = row[1];
			qrmaRecord.project = req.defaultProject;
			qrmaRecord.dateAndValue = [];

			let index = 0;
			row.slice(2).forEach((column) => {
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
				const month = jsDate.toLocaleString('default', { month: 'numeric' });
				const year = jsDate.toLocaleString('default', { year: 'numeric' });
				0;

				if (month == selectedMonth && year == selectedYear) {
					//parsing data for date and month obj
					dateAndValueObj.date = jsDate;
					dateAndValueObj.value = parseInt(column);
					qrmaRecord.dateAndValue.push(dateAndValueObj);
				}

				index++;
			});
			// console.log(selectedMonth);

			// checking if a record with this resource id already exists in db
			const savedQuantum = await QuantumResourcesManpowerAdmin.findOne({
				resourceId: qrmaRecord.resourceId,
			});
			// console.log(qrmaRecord.resourceId);
			// console.log(savedQuantum);

			// if record for resource id exists
			if (savedQuantum) {
				//checking if data is stored for this month
				if (
					savedQuantum.dateAndValue.some(
						(d) =>
							d.date.getTime() === qrmaRecord.dateAndValue[0].date.getTime()
					)
				) {
					const startDate = qrmaRecord.dateAndValue[0].date.getTime();
					const endDate =
						qrmaRecord.dateAndValue[
							qrmaRecord.dateAndValue.length - 1
						].date.getTime();

					//if data already includes for this month
					console.log('data includes already for this month');

					//delete data of that specific month
					await QuantumResourcesManpowerAdmin.updateMany(
						{ resourceId: qrmaRecord.resourceId },
						{
							$pull: {
								dateAndValue: {
									date: { $gte: startDate, $lte: endDate },
								},
							},
						},
						{ safe: true, multi: true }
					);

					//save new record to db
					await QuantumResourcesManpowerAdmin.findByIdAndUpdate(
						{ _id: savedQuantum._id },
						{ $push: { dateAndValue: qrmaRecord.dateAndValue } }
					);
				} else {
					//if this month data is not included update date and values array
					await QuantumResourcesManpowerAdmin.findByIdAndUpdate(
						{ _id: savedQuantum._id },
						{ $push: { dateAndValue: qrmaRecord.dateAndValue } }
					);
				}
			} else {
				//save new record to db
				const newQuantum = new QuantumResourcesManpowerAdmin(qrmaRecord);
				await newQuantum.save();
			}
		}

		res.status(200).json({ success: true, msg: 'data recieved' });
	}
);
