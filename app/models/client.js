/**
 * Client model
 */
var mongoose = require('mongoose');
var User = require('./user');

// define schema
var schema = mongoose.Schema({
  _user: { type: Number, ref: 'User' },
  name: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: String,
    line3: String,
    town: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true } // TODO country validator
  },
  created_at: {type: Date, default: Date.now},
  contact: {
    name: { type: String, required: true },
    phone: String
  }
});

// create model
var Client = mongoose.model('clients', schema);

module.exports = Client;

