var database = require('../../database');

var user = new database.Schema({
  num: {
    type: String,
    validate:/.+/
  },
  uid: {
    type: String,
    validate:/.+/,
    default: 0
  },
  name: {
    type: String,
    validate:/.+/,
    default: 0
  },
  render: {
    type: String,
    validate:/.+/,
    default: 0
  },
  occupation: {
    type: String,
    validate:/.+/,
    default: 0
  },
  age: {
    type: String,
    validate:/.+/,
    default: 0
  },
  created_at:{
    type: Date,
    default: Date.now
  }
});

var userSchema = {
  user: user
};

module.exports = userSchema;