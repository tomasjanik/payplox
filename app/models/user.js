/**
 * User model
 */
var mongoose = require('mongoose');
var Client = require('./client');
var bCrypt = require('bcrypt-nodejs');

// define schema
var schema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  created_at: {type: Date, default: Date.now},
  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }]
});


// compares password hash
schema.methods.validPassword = function(password){
  return bCrypt.compareSync(password, this.password);
};

// Generates hash using bCrypt
schema.methods.createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// create model
var User = mongoose.model('users', schema);

module.exports = User;
