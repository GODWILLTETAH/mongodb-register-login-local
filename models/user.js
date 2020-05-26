const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  
specialty: {
    type: String,
    required: true
  },
  
matricule: {
    type: String,
    required: true
  },
skills: {
    type: String,
    required: true
  },
additional: {
    type: String,
    required: true
  },
  
contact: {
    type: Number,
    required: true
  },
address: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  campus: {
    type: String,
    required: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
