import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/userSlice';
import { Toaster } from 'react-hot-toast';

const Layout: React.FC = ({ children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		try {
			const userFromLocalStorage = JSON.parse(localStorage.getItem('user') || 'null');
			if (userFromLocalStorage) {
				dispatch(setUser(userFromLocalStorage));
				navigate('/task');

			} else {
				console.log("1");
				navigate('/');
			}
		} catch (error) {
			console.error('Error parsing user from localStorage:', error);
			navigate('/');
		}
	}, [dispatch, navigate]);


	return (
		<>
			<Outlet />
			<Toaster />
		</>
	);
};

export default Layout;
