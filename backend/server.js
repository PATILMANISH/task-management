const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const users = [{ id: 1, email: 'manish@admin.com', password: 'password' }];
let tasks = [];

app.post('/api/login', (req, res) => {
	const { email, password } = req.body;
	const user = users.find(u => u.email === email && u.password === password);

	if (user) {
		const token = jwt.sign({ userId: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
		res.json({ token });
	} else {
		res.status(401).json({ error: 'Invalid credentials' });
	}
});

app.post('/api/signup', (req, res) => {
	const { email, password } = req.body;
	const existingUser = users.find(u => u.email === email);

	if (existingUser) {
		return res.status(400).json({ error: 'Email already exists' });
	}

	const newUser = { id: users.length + 1, email, password };
	users.push(newUser);

	res.json({ message: 'Signup successful' });
});

app.post('/api/save-tasks', (req, res) => {
	const { tasks: newTasks, addedBy } = req.body;
	tasks = newTasks;
	res.json({ message: 'Tasks saved successfully' });
});

app.get('/api/tasks/:email', (req, res) => {
	const { email } = req.params;
	const user = users.find(u => u.email === email);

	if (!user) {
		return res.status(404).json({ error: 'User not found' });
	}

	const userTasks = tasks.filter(task => task.addedBy === email);
	res.json(userTasks);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
