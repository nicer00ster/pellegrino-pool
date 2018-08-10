const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  active: {
    type: Boolean,
    default: false
  },
  firstName: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('UserSession', UserSessionSchema);
