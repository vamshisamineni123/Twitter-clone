import React, { useEffect, useRef, useState } from 'react';
import Profile from './pages/Profile.page';
import Home from './pages/Home.page';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.page';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/index.slice';
import { setRam } from './store/Postsreducer.slice';

const App: React.FC = () => {
  const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.posts.ram);
   const renderCount = useRef(0);

   useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  useEffect(() => {
      if(localStorage.getItem('user')==='true'){
             dispatch(setRam(true));
      }
  },[])
  // localStorage.setItem('user', 'false');
  const test=useSelector((state:RootState)=>state.posts.ram)
  console.log(localStorage.getItem('user'));
  console.log('ram  ',test)
  // const isLoggedIn=localStorage.getItem('user')==='true'?true:false;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={localStorage.getItem('user')==='true'? <Navigate to="/" /> : <Login  />} />
        <Route path="/" element={localStorage.getItem('user')==='true' ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={localStorage.getItem('user')==='true' ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;