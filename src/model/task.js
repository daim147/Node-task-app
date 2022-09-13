const mongoose = require('mongoose');
const Task = mongoose.model('Task', {
	completed: {
		type: Boolean,
		default: false,
	},
	description: {
		type: String,
		trim: true,
		required: true,
	},
});
module.exports = Task;
