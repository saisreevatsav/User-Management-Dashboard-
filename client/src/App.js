import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import UserForm from './pages/userform';
import UserDetails from './pages/userdetails';
import EditUser from './pages/edituser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/new" element={<UserForm />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/user/:id/edit" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
