var database = require('../database');

//管理员信息
var guess = new database.Schema({
  unicode: {
    type:Number,
    validate:/.+/
  },
  num: {
    type:Number,
    validate:/.+/
  },
  unum: {
    type:Number,
    validate:/.+/
  },
  qnum:{
    type:Number,
    validate:/.+/
  },
  date: {
    type:Date,
    default: Date.now
  },
  pointid: {
    type:String,
    validate:/.+/,
    default: ""
  },
  qid: {
    type:String,
    valiedate:/.+/,
    default: ""
  },
  question:{
    type:String,
    validate:/.+/
  },
  perpoint:{
    type:Number,
    validate:/.+/
  },
  pit:{
    type:Number,
    validate:/.+/
  },
  optionid:{
    type:Number,
    validate:/.+/
  },
  option:{
    type:String,
    validate:/.+/
  },
  final: {
    type:Number,
    validation:/.+/
  },
  created_at:{
    type:Date,
    default: Date.now
  }
});

var guessSchema = {
  guess: guess
};

module.exports = guessSchema;