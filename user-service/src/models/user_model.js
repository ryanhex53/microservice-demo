const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'guest'],
    default: 'guest'
  },
  address_id: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema }