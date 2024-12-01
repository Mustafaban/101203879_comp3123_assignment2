import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validateEmployee } from '../utils/employeeValidation';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateEmployee(employee);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('http://localhost:5000/emp/employees', employee, {
          headers: { Authorization: `Bearer ${localStorage.getItem('username')}` }
        });
        navigate('/employees');
      } catch (error) {
        console.error('Error adding employee:', error);
        alert('Failed to add employee. Please try again.');
      }
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2 className="mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input type="text" className={`form-control ${errors.first_name ? 'is-invalid' : ''}`} id="first_name" name="first_name" value={employee.first_name} onChange={handleChange} required />
          {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input 
            type="text" 
            className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} 
            id="last_name" 
            name="last_name" 
            value={employee.last_name} 
            onChange={handleChange} 
            required 
          />
          {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
            id="email" 
            name="email" 
            value={employee.email} 
            onChange={handleChange} 
            required 
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">Position</label>
          <input 
            type="text" 
            className={`form-control ${errors.position ? 'is-invalid' : ''}`} 
            id="position" 
            name="position" 
            value={employee.position} 
            onChange={handleChange} 
            required 
          />
          {errors.position && <div className="invalid-feedback">{errors.position}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input 
            type="number" 
            className={`form-control ${errors.salary ? 'is-invalid' : ''}`} 
            id="salary" 
            name="salary" 
            value={employee.salary} 
            onChange={handleChange} 
            required 
          />
          {errors.salary && <div className="invalid-feedback">{errors.salary}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="date_of_joining" className="form-label">Date of Joining</label>
          <input 
            type="date" 
            className="form-control" 
            id="date_of_joining" 
            name="date_of_joining" 
            value={employee.date_of_joining} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input 
            type="text" 
            className={`form-control ${errors.department ? 'is-invalid' : ''}`} 
            id="department" 
            name="department" 
            value={employee.department} 
            onChange={handleChange} 
            required 
          />
          {errors.department && <div className="invalid-feedback">{errors.department}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
