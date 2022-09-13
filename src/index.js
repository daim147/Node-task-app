const express = require('express');
const morgan = require('morgan');
require('./db/mongoose');
const UserRouter = require('./routers/user');
const TaskRouter = require('./routers/task');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/user', UserRouter);
app.use('/task', TaskRouter);

app.listen(process.env.port || 3000, () => console.log('Server is up on port 3000'));

// (async () => {
// 	const token = await jwt.sign({ _id: 'abc123' }, 'thisIsMyNewCourse', { expiresIn: '7 days' });
// 	console.log(token);
// })();
