var database = require('../../database');

var survey = new database.Schema({
  num: {
    type: String,
    validate:/.+/
  },
  uid: {
    type: String,
    validate:/.+/,
    default: 0
  },
  answer1: {
    type: String,
    validate:/.+/,
    default: 0
  },
  answer2: {
    type: String,
    validate:/.+/,
    default: 0
  },
  answer3: {
    type: String,
    validate:/.+/,
    default: 0
  },
  answer4: {
    type: String,
    validate:/.+/,
    default: 0
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