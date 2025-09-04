import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";



function EditUser() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/users/${id}`).then((res) => setForm(res.data));
  }, [id]);

  if (!form) return <div className="container py-4">Loading...</div>;

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.com$/.test(form.email))
      newErrors.email = 'Email must be valid and end with ".com"';

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be exactly 10 digits";

    if (!form.company.trim()) newErrors.company = "Company is required";

    if (!form.address.street.trim()) newErrors.street = "Street is required";
    if (!form.address.city.trim()) newErrors.city = "City is required";
    if (!form.address.zipcode.trim()) newErrors.zipcode = "Zipcode is required";

    const lat = parseFloat(form.address.geo.lat);
    if (!form.address.geo.lat.trim()) newErrors.lat = "Latitude is required";
    else if (isNaN(lat) || lat < -90 || lat > 90)
      newErrors.lat = "Latitude must be a number between -90 and 90";

    const lng = parseFloat(form.address.geo.lng);
    if (!form.address.geo.lng.trim()) newErrors.lng = "Longitude is required";
    else if (isNaN(lng) || lng < -180 || lng > 180)
      newErrors.lng = "Longitude must be a number between -180 and 180";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const [, field] = name.split(".");
      setForm({ ...form, address: { ...form.address, [field]: value } });
    } else if (name.startsWith("geo.")) {
      const [, field] = name.split(".");
      setForm({
        ...form,
        address: {
          ...form.address,
          geo: { ...form.address.geo, [field]: value },
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }

    setErrors({ ...errors, [name]: "" }); // Clear error on change
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await api.put(`/users/${id}`, form);
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="container py-4">
      <h2>Edit User</h2>

      

      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <form onSubmit={handleSubmit} className="row g-3" noValidate>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            name="phone"
            type="tel"
            pattern="\d{10}"
            maxLength="10"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Company</label>
          <input
            name="company"
            className={`form-control ${errors.company ? "is-invalid" : ""}`}
            value={form.company}
            onChange={handleChange}
          />
          {errors.company && (
            <div className="invalid-feedback">{errors.company}</div>
          )}
        </div>

        <div className="col-12">
          <h5>Address</h5>
        </div>

        <div className="col-md-6">
          <label className="form-label">Street</label>
          <input
            name="address.street"
            className={`form-control ${errors.street ? "is-invalid" : ""}`}
            value={form.address.street}
            onChange={handleChange}
          />
          {errors.street && (
            <div className="invalid-feedback">{errors.street}</div>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">City</label>
          <input
            name="address.city"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            value={form.address.city}
            onChange={handleChange}
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>

        <div className="col-md-2">
          <label className="form-label">Zipcode</label>
          <input
            name="address.zipcode"
            className={`form-control ${errors.zipcode ? "is-invalid" : ""}`}
            value={form.address.zipcode}
            onChange={handleChange}
          />
          {errors.zipcode && (
            <div className="invalid-feedback">{errors.zipcode}</div>
          )}
        </div>

        <div className="col-12">
          <h5>Geo Location</h5>
        </div>

        <div className="col-md-6">
          <label className="form-label">Latitude</label>
          <input
            name="geo.lat"
            type="number"
            step="any"
            min={-90}
            max={90}
            className={`form-control ${errors.lat ? "is-invalid" : ""}`}
            value={form.address.geo.lat}
            onChange={handleChange}
          />
          {errors.lat && <div className="invalid-feedback">{errors.lat}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Longitude</label>
          <input
            name="geo.lng"
            type="number"
            step="any"
            min={-180}
            max={180}
            className={`form-control ${errors.lng ? "is-invalid" : ""}`}
            value={form.address.geo.lng}
            onChange={handleChange}
          />
          {errors.lng && <div className="invalid-feedback">{errors.lng}</div>}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success mt-3">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
