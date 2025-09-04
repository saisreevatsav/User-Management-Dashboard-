import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/users/${id}`).then(res => setUser(res.data));
  }, [id]);

  if (!user) return <div className="container py-4">Loading...</div>;

  return (
    <div className="container py-4">
      <h2>User Details</h2>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Company:</strong> {user.company}</p>
          <p><strong>Address:</strong> {user.address.street}, {user.address.city} - {user.address.zipcode}</p>
          <p><strong>Geo Location:</strong> Latitude: {user.address.geo.lat}, Longitude: {user.address.geo.lng}</p>
        </div>
      </div>
      <Link to="/" className="btn btn-secondary mt-3">Back to Dashboard</Link>
    </div>
  );
}

export default UserDetails;
