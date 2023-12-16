import React, { useEffect, useRef, useState } from 'react';
import Profile from './pages/Profile.page';
import Home from './pages/Home.page';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.page';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/index.slice';
import { setRam } from './store/Postsreducer.slice';
import { login } from './store/loginreducer.slice';
import SignUp from './pages/Signup.page';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.login.isAuthenticated);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      
      if (email !== null && password !== null) {
        dispatch(login({ email, password }));
      }
    }
  }, [])
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/" element={isLoggedIn? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={isLoggedIn? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;