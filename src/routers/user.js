const User = require('../model/user');
const router = require('express').Router();
const jwtVerification = require('../middlewares/auth');

router
	.route('/')
	.get(jwtVerification)
	.get((req, res) => {
		User.find({})
			.then((user) => {
				res.status(200).send(user);
			})
			.catch((error) => {
				res.status(500).send();
			});
	})
	.post(async (req, res) => {
		try {
			const user = new User(req.body);
			await user.save();
			const token = await user.generateAuthToken();
			res.status(201).send({ user, token });
		} catch (error) {
			res.status(400).send(error.message);
		}
	});

router
	.route('/:id')
	.all(jwtVerification)
	.get((req, res) => {
		User.findById(req.params.id)
			.then((user) => {
				if (!user) {
					return res.status(404).send();
				}
				res.status(200).send(user);
			})
			.catch((error) => {
				res.status(500).send();
			});
	})
	.patch(async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));
			await user.save();
			if (!user) return res.status(404).send();
			res.status(200).send(user);
		} catch (error) {
			res.status(400).send(error);
		}
	})
	.delete(async (req, res) => {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			if (!user) return res.status(404).send();
			res.status(200).send(user);
		} catch (error) {
			res.status(400).send(error);
		}
	});

router.post('/login', async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.status(200).send({ user, token });
	} catch (error) {
		res.status(400).send(error);
	}
});

router.post('/logout', jwtVerification, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
		req.user.save();
		res.status(200).send();
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

router.post('/logoutAll', jwtVerification, async (req, res) => {
	try {
		req.user.tokens = [];
		req.user.save();
		res.status(200).send();
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

module.exports = router;
