var database = require('../../database');

var survey = new database.Schema({
  id: {
    type: String,
    validate:/.+/,
    default: ""
  },
  p1: {
    type: String,
    validate:/.+/,
    default: ""
  },
  p2: {
    type: String,
    validate:/.+/,
    default: ""
  },
  p3: {
    type: String,
    validate:/.+/,
    default: ""
  },
  p4: {
    type: String,
    validate:/.+/,
    default: ""
  },
  p5: {
    type: String,
    validate:/.+/,
    default: ""
  },
  p6: {
    type: String,
    validate:/.+/,
    default: ""
  },
  created_at:{
    type: Date,
    default: Date.now
  }
});

var surveySchema = {
  survey: survey
};

module.exports = surveySchema;