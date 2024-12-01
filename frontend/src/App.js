import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsAuthenticated(!!username);
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('username', username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/employees" 
            element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-employee" 
            element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/edit-employee/:id" 
            element={isAuthenticated ? <EditEmployee /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/employees" : "/login"} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

