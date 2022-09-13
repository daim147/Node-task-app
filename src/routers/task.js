const Task = require('../model/task');
const router = require('express').Router();

router
	.route('/')
	.post((req, res) => {
		const task = new Task(req.body);
		task
			.save()
			.then(() => {
				res.status(201).send(task);
			})
			.catch((error) => {
				res.status(400).send(error);
			});
	})
	.get((req, res) => {
		Task.find({})
			.then((task) => {
				res.status(200).send(task);
			})
			.catch((error) => {
				res.status(500).send();
			});
	});

router
	.route('/:id')
	.get((req, res) => {
		Task.findById(req.params.id)
			.then((task) => {
				if (!task) {
					return res.status(404).send();
				}
				res.status(200).send(task);
			})
			.catch((error) => {
				res.status(500).send();
			});
	})
	.patch(async (req, res) => {
		try {
			const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!task) return res.status(404).send();
			res.status(200).send(task);
		} catch (error) {
			res.status(400).send(error);
		}
	})
	.delete(async (req, res) => {
		try {
			const task = await Task.findByIdAndDelete(req.params.id);
			if (!task) return res.status(404).send();
			res.status(200).send(task);
		} catch (error) {
			res.status(400).send(error);
		}
	});

module.exports = router;
