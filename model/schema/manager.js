var database = require('../database');

//管理员信息
var manager = new database.Schema({
  num: {
    type:Number,
    validate:/.+/
  },
  name:{
    type:String,
    validate:/.+/
  },
  psw:{
    type:String,
    validate:/.+/
  },
  cookie: {
    type:String
  },
  level: {
    type:Number,
    validate:/.+/,
    default: 0
  },
  created_at:{
    type:Date,
    default: Date.now
  }
});

var managerSchema = {
  manager:manager
};

module.exports = managerSchema;