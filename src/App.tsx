import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Authentication from './Authentication';
import Layout from './Layout';
import TaskList from './TaskList';

export const apiUrl = import.meta.env.VITE_API_URL;

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Authentication />} />
				<Route path='/task' element={<TaskList />} />
			</Route>
		</Routes>
	);
};

export default App;
