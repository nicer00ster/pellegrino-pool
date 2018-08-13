const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  },
  gamesWon: {
    type: Number,
    default: 0
  }
});

UserSchema.methods.generateHash = function(password) {
  console.log(password);
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
  console.log(password);
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
