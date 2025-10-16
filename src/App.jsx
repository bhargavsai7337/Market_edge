import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import ClientEngagement from './components/ClientEngagement';
import UserManagement from './components/UserManagement';
import Employeemanagement from './components/Employeemanagement';

function App() {
  
  return(
    <Router>
      <div className="app">
        <Header />
        <div className="main">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/client-engagement" element={<ClientEngagement />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/employee-management" element={<Employeemanagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App
