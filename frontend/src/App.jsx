import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './courses/CourseDetail';
import Tutorial from './pages/Tutorial';
import Login from './login/Login';
import Register from './login/Register';
import Note from './pages/Note';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/tutorials" element={<Tutorial />} />
          <Route path="/notes" element={<Note/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer/>
      
    </Router>
  );
}

export default App;
