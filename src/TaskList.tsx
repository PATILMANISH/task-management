import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { apiUrl } from './App';
import TaskItem from './TaskItem';
import { addTask, setTasks } from './store/taskSlice';
import { clearUser } from './store/userSlice';
import { toast } from 'react-hot-toast';

const TaskList = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const tasks = useSelector((state) => state.tasks);

	if (!user) navigate('/');

	const [filteredTasks, setFilteredTasks] = useState([]);
	const [markStatus, setMarkStatus] = useState('');

	const filterTasks = (option) => {
		let newFilteredTasks;

		switch (option) {
			case 'completed':
				newFilteredTasks = tasks.filter((task) => task.completed);
				break;
			case 'notCompleted':
				newFilteredTasks = tasks.filter((task) => !task.completed);
				break;
			default:
				newFilteredTasks = tasks;
				break;
		}

		setFilteredTasks(newFilteredTasks);
	};

	useEffect(() => {
		setFilteredTasks(tasks);
	}, [tasks]);

	const fetchData = async () => {
		try {
			const response = await axios.get(`${apiUrl}tasks/${user.email}`);
			dispatch(setTasks(response.data));
			setFilteredTasks(response.data);
		} catch (error) {
			toast.error('Something Went Wrong!');
			console.error('Error fetching tasks:', error.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, [dispatch, user?.email]);

	const saveTasksToLocalStorage = (tasks) => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	};

	const handleAddMore = () => {
		const newTask = { id: uuidv4(), title: `Task ${tasks.length + 1}`, completed: false, addedBy: user.email, };

		setFilteredTasks((prev) => [...prev, newTask]);
		dispatch(addTask(newTask));
		toast.success('New Task Added');

	};

	const handleSaveTasks = async () => {
		try {
			const localTasks = getTasksFromLocalStorage();
			const response = await axios.post(`${apiUrl}save-tasks`, {
				tasks: localTasks,
				addedBy: user.email,
			});

			console.log(response.data.message);
			setMarkStatus('');
			toast.success('Task Saved successfully');

		} catch (error) {
			toast.error('Something Went Wrong!');
			console.error('Error saving tasks:', error.message);
		}
	};

	const deleteTask = (taskId) => {
		const updatedTasks = tasks.filter((task) => task.id !== taskId);
		dispatch(setTasks(updatedTasks));
		setFilteredTasks(updatedTasks);
		saveTasksToLocalStorage(updatedTasks);
		setMarkStatus('');
		toast.success('Deleted successfully');
	};

	const toggleTaskCompletion = (taskId) => {
		const updatedTasks = tasks.map((task) =>
			task.id === taskId ? { ...task, completed: !task.completed } : task
		);
		dispatch(setTasks(updatedTasks));
		setFilteredTasks(updatedTasks);
		saveTasksToLocalStorage(updatedTasks);
		setMarkStatus('');
	};

	const handleLogout = () => {
		toast.success('Logout successfully');
		dispatch(clearUser());
		navigate('/');
	};

	const handleDragStart = (e, index) => {
		e.dataTransfer.setData('text/plain', index.toString());
	};

	const handleDrop = (e, dropIndex) => {
		const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
		const draggedTask = filteredTasks[draggedIndex];
		const updatedTasks = filteredTasks.filter((_, index) => index !== draggedIndex);
		updatedTasks.splice(dropIndex, 0, draggedTask);

		setFilteredTasks(updatedTasks);
		saveTasksToLocalStorage(updatedTasks);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleMarkStatusChange = (status) => {
		setMarkStatus(status);
		filterTasks(status);
	};

	const getTasksFromLocalStorage = () => {
		const tasksString = localStorage.getItem('tasks');
		return tasksString ? JSON.parse(tasksString) : [];
	};

	const handleEditSave = (taskId, newTitle) => {
		const updatedTask = { ...tasks.find((task) => task.id === taskId), title: newTitle };
		const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));

		dispatch(setTasks(updatedTasks));
		setFilteredTasks(updatedTasks);
		saveTasksToLocalStorage(updatedTasks);
		toast.success('Data saved successfully');
	};

	return (
		<div className="bg-white">
			<div className="bg-gray-800 text-white p-4">
				<div className="container mx-auto flex justify-between items-center">
					<h2 className="text-2xl font-semibold">Task Manager</h2>
					<div className="flex items-center space-x-4">
						<span className="text-gray-100">{user?.email}</span>
						<button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600" > Logout </button>
					</div>
				</div>
			</div>

			<div className="container mx-auto my-4">
				<div className="flex justify-between items-center mb-4 mx-5">
					<h3 className="text-2xl font-semibold">Task List</h3>
					<div className="flex space-x-4">
						<button onClick={handleAddMore} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" > Add More </button>
						<button onClick={handleSaveTasks} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" > Save Tasks </button>
						<select value={markStatus} onChange={(e) => handleMarkStatusChange(e.target.value)} className="bg-gray-300 text-gray-700 rounded px-2 py-1" >
							<option value="">All</option>
							<option value="completed">Mark as Completed</option>
							<option value="notCompleted">Mark as Not Completed</option>
						</select>
					</div>
				</div>

				<ul className="w-full">
					{filteredTasks.map((task, index) => (
						<li key={task.id} draggable onDragStart={(e) => handleDragStart(e, index)} onDrop={(e) => handleDrop(e, index)} onDragOver={handleDragOver} className="mx-5" >
							<TaskItem task={task} onDelete={() => deleteTask(task.id)} onToggleCompletion={() => toggleTaskCompletion(task.id)} onEditSave={handleEditSave} filteredTasks={filteredTasks} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default TaskList;
