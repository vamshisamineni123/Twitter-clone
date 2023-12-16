import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setPassword, setRam } from '../store/Postsreducer.slice';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../store/loginreducer.slice';



const Login: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const u = useSelector((state: any) => state.posts.username);
    const p = useSelector((state: any) => state.posts.password);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3002/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: inputEmail, password: inputPassword })
            });
            console.log(response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('email', inputEmail);
            localStorage.setItem('password', inputPassword);
            dispatch(login({ email: inputEmail, password: inputPassword }))

            navigate('/');
        } catch (error) {
            console.error('invalid credentails');
        }
        setInputEmail('');
        setInputPassword('');
    };

    return (
        <div className="login-container bg-blue-500 flex items-center justify-center h-screen">
            <div className="login-card bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Log in to Twitter</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm text-gray-600">Phone, email, or username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-input"
                            placeholder="e.g., yourusername"
                            value={inputEmail}
                            onChange={e => setInputEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-input"
                            placeholder="Password"
                            value={inputPassword}
                            onChange={e => setInputPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500">Log In</button>
                    </div>
                    <div>
                        <p className="text-center">Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;