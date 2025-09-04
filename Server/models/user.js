const mongoose = require('mongoose');

const geoSchema = new mongoose.Schema({
  lat: {
    type: String,
    required: [true, 'Latitude is required'],
  },
  lng: {
    type: String,
    required: [true, 'Longitude is required'],
  },
}, { _id: false });

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  zipcode: {
    type: String,
    required: [true, 'Zipcode is required'],
  },
  geo: {
    type: geoSchema,
    required: true,
  },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Email must be a valid format'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
  },
  address: {
    type: addressSchema,
    required: true,
  },
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
