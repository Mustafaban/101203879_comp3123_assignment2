import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Employee Management</Link>
        <div className="navbar-nav">
          {isAuthenticated ? (
            <>
              <Link className="nav-item nav-link" to="/employees">Employees</Link>
              <Link className="nav-item nav-link" to="/add-employee">Add Employee</Link>
              <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="nav-item nav-link" to="/login">Login</Link>
              <Link className="nav-item nav-link" to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

