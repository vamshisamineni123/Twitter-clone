import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3002/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, email: email, password: password})
    });

    navigate('/login');
    // Handle the response here
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form className="p-10 bg-white rounded shadow-md w-80" onSubmit={handleSubmit}>
        <h2 className="mb-5 text-3xl flex justify-center">Sign In</h2>
        <input
          type="text"
          className="mb-4 w-full px-3 py-2 border border-gray-400 rounded-md"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="mb-4 w-full px-3 py-2 border border-gray-400 rounded-md"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="mb-4 w-full px-3 py-2 border border-gray-400 rounded-md"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;