var database = require('../../database');

var game = new database.Schema({
  num: {
    type: String,
    validate:/.+/
  },
  uid: {
    type: String,
    validate:/.+/,
    default: 0
  },
  created_at:{
    type: Date,
    default: Date.now
  }
});

var gameSchema = {
  game: game
};

module.exports = gameSchema;