const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
	completed: {
		type: Boolean,
		default: false,
	},
	description: {
		type: String,
		trim: true,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
});

taskSchema.pre(/^find/, function (next) {
	this.populate('owner');
	next();
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
