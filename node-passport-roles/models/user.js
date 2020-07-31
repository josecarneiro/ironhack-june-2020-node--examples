'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: 'customer',
    enum: ['customer', 'seller', 'admin']
  },
  passwordHash: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
