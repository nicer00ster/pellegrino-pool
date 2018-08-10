const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  uid: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  title: {
    type: String,
    default: ''
  },
  players: {
    type: Array,
    default: []
  },
  winner: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Game', GameSchema);
