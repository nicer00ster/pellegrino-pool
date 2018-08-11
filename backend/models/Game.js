const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
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
  },
  owner: {
    type: String,
    default: ''
  },
});

module.exports = mongoose.model('Game', GameSchema);
