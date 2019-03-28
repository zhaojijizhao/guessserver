var database = require('../database');
var guess = require('./guess');

//用户信息
var user = new database.Schema({
  num:{
    type:Number,
    validate:/.+/
  },
  name:{
    type:String
  },
  cell:{
    type:Number,
    validate:/.+/
  },
  psw:{
    type:String,
    validate:/.+/
  },
  point: {
    type:Number,
    validate:/.+/,
    default: 0
  },
  coin: {
    type: Number,
    validate: /.+/,
    default: 0
  },
  limit: {
    type: Number,
    validate: /.+/,
    default: 0
  },
  cookie: {
    type:String
  },
  rate: {
    type: Number,
    validate:/.+/,
    default: 0
  },
  guess: [String],
  created_at:{
    type:Date,
    default: Date.now
  },
  update_at:{
    type:Date,
    default: Date.now
  },
  logindays:{
    type: Number,
    validate:/.+/,
    default: 0
  }
});

var userSchema = {
  user:user
};

module.exports = userSchema;