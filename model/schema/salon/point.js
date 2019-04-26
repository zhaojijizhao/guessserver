var database = require('../../database');

var point = new database.Schema({
  id: {
    type: String,
    validate:/.+/,
    default: 0
  },
  page: {
    type: String,
    validate:/.+/,
    default: 0
  },
  ip: {
    type: String,
    validate:/.+/,
    default: 0
  },
  created_at:{
    type: Date,
    default: Date.now
  }
});

var pointSchema = {
  point: point
};

module.exports = pointSchema;