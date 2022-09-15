const mongoose = require('mongoose');

mongoose.connect(
	'mongodb://127.0.0.1:27017/task-manager-api',
	{
		useNewUrlParser: true,
	},
	(error) => {
		if (error) {
			return console.log('Unable to connect to database');
		}
		console.log('Connected to database');
	}
);
