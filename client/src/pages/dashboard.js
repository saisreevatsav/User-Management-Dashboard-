import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    api.get('/users').then(res => {
      const sortedUsers = res.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setUsers(sortedUsers);
    });
  }, []);

  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      user.company.toLowerCase().includes(term) ||
      user.address.city.toLowerCase().includes(term) ||
      user.address.zipcode.toLowerCase().includes(term) ||
      user.address.geo.lat.toString().toLowerCase().includes(term) ||
      user.address.geo.lng.toString().toLowerCase().includes(term)
    );
  });

  const styleSearch = {
    width: isFocused || searchTerm ? '300px' : '150px',
    transition: 'width 0.3s ease',
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User Dashboard</h2>
        <Link to="/user/new" className="btn btn-primary">Add User</Link>
      </div>

      {/* Animated Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className={`form-control animated-search ${searchTerm ? 'not-empty' : ''}`}
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styleSearch}
        />
      </div>

      {/* Users Table */}
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>City</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (filteredUsers.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.company}</td>
              <td>{u.address.city}</td>
              <td>
                <Link to={`/user/${u._id}`} className="btn btn-sm btn-info me-1">View</Link>
                <Link to={`/user/${u._id}/edit`} className="btn btn-sm btn-warning me-1">Edit</Link>
                <button onClick={() => {
                  if (window.confirm('Are you sure to delete this user?')) {
                    api.delete(`/users/${u._id}`).then(() =>
                      setUsers(users.filter(x => x._id !== u._id)));
                  }
                }} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))) : (
            <tr><td colSpan="6" className="text-center">No matching users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );  
}

export default Dashboard;
