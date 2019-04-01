var database = require('../../database');

var user = new database.Schema({
  id: {
    type: String,
    validate:/.+/,
    default: ""
  },
  name: {
    type: String,
    validate:/.+/,
    default: ""
  },
  company: {
    type: String,
    validate:/.+/,
    default: ""
  },
  phone: {
    type: String,
    validate:/.+/,
    default: ""
  },
  mail: {
    type: String,
    validate:/.+/,
    default: ""
  },
  work: {
    type: String,
    validate:/.+/,
    default: ""
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