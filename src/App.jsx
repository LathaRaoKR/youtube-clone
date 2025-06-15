import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Video from './pages/Video/Video'
import { BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login/Login"; // adjust the path if needed

import Signup from './pages/Signup/Signup';

const App = () => {

const [sidebar,setSidebar]=useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App
