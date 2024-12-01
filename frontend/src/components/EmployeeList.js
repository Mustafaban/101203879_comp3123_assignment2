import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('department');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const username = localStorage.getItem('username');
      if (!username) {
        navigate('/login');
        return;
      }
      const response = await axios.get('http://localhost:5000/emp/employees', {
        headers: { Authorization: `Bearer ${username}` }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('username')}` }
        });
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/emp/search`, {
        params: { [searchBy]: searchTerm },
        headers: { Authorization: `Bearer ${localStorage.getItem('username')}` }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Employee List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control d-inline-block w-auto mr-2"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select d-inline-block w-auto mr-2"
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="department">Department</option>
          <option value="position">Position</option>
        </select>
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{`${employee.first_name} ${employee.last_name}`}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>
                <Link to={`/edit-employee/${employee._id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button onClick={() => handleDelete(employee._id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;

