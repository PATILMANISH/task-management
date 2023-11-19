/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from './store/userSlice';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from './App';
import { toast } from 'react-hot-toast';



const Authentication: React.FC = () => {

	console.log("111")
	const navigate = useNavigate()
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
			isLogin: true,
			errors: { message: '' }
		},
		validationSchema: () => validationSchema(formik.values.isLogin),
		onSubmit: async (values, { setSubmitting, setErrors }) => {
			try {
				setSubmitting(true);

				const endpoint = values.isLogin ? 'login' : 'signup';
				const requestData = { email: values.email, password: values.password, confirmPassword: '' };

				if (!values.isLogin) {
					requestData.confirmPassword = values.confirmPassword;
				}
				const response = await axios.post(`${apiUrl}${endpoint}`, requestData);
				const token = response.data.token;
				dispatch(setUser({ email: values.email, token }));

				navigate('/task')
				toast.success('Login Successfully...');

				console.log('Authentication successful. Token:', token);

			} catch (error: any) {
				if (error.response && error.response.status === 401) {
					setErrors({ message: 'Invalid email or password.' });
				} else {
					setErrors({ message: error.message || 'An error occurred during authentication.' });
				}
				toast.error('Something went wrong...');
				dispatch(clearUser());
			} finally {
				setSubmitting(false);
			}
		},
	});

	const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = formik;

	const switchForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		formik.resetForm();
		formik.setValues({ ...values, isLogin: !values.isLogin, confirmPassword: '' });
	};



	return (
		<div className="flex h-screen w-full min-h-full items-center justify-center p-10">
			<div className="hidden sm:block grow w-80">
				<img src="https://i0.wp.com/getflowdotcom.wpcomstaging.com/wp-content/uploads/2020/06/task-management-workflow.jpg" className="object-fit" alt="Task" />
			</div>
			<div className="flex-1">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm ">
					<h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900"> Task Management App </h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<Input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} onBlur={handleBlur} error={touched.email && errors.email ? errors.email : ''} />

						<Input id="password" name="password" type="password" autoComplete="current-password" value={values.password} onChange={handleChange} onBlur={handleBlur} error={touched.password && errors.password ? errors.password : ''} />

						{!values.isLogin && (
							<Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="current-password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : ''} />
						)}

						<div>
							<button type="submit" disabled={isSubmitting} className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500" > {isSubmitting ? 'Processing...' : values.isLogin ? 'Login' : 'Register'} </button>
							{formik.errors.message && <p className="mt-2 text-center text-red-500 text-xs">{formik.errors.message}</p>}
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500"> Not a member?
						<a href="#" onClick={switchForm} className="font-semibold text-indigo-600 hover:text-indigo-500"> {values.isLogin ? ' Register' : ' Login'} </a>
					</p>
				</div>
			</div>
		</div>
	);
};

const validationSchema = (isLogin: boolean) => {
	if (isLogin) {
		return Yup.object({
			email: Yup.string().email('Invalid email address').required('Please enter your email.'),
			password: Yup.string().required('Please enter your password.'),
		});
	} else {
		return Yup.object({
			email: Yup.string().email('Invalid email address').required('Please enter your email.'),
			password: Yup.string().required('Please enter your password.'),
			confirmPassword: Yup.string()
				.test('password-match', 'Passwords must match', function (value) {
					return value === this.resolve(Yup.ref('password'));
				})
				.required('Please confirm your password.'),
		});
	}
};

const Input: React.FC<{ id: string; name: string; type: string; autoComplete: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onBlur: (e: React.FocusEvent<HTMLInputElement>) => void; error: string; }> = ({ id, name, type, autoComplete, value, onChange, onBlur, error }) => (
	<div>
		<label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900"> {name} </label>
		<div className="mt-2">
			<input id={id} name={name} type={type} autoComplete={autoComplete} value={value} onChange={onChange} onBlur={onBlur} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-indigo-300 sm:text-sm sm:leading-6" />
			{error && <span className="text-red-500 text-xs">{error}</span>}
		</div>
	</div>
);
export default Authentication;
