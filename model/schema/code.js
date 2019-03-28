var database = require('../database');

//管理员信息
var code = new database.Schema({
  code: {
    type:String,
    validate:/.+/
  },
  num: {
    type:String,
    validate:/.+/
  },
  unum: {
    type:Number,
  },
  used: {
    type: Boolean,
    default: false
  },
  created_at:{
    type:Date,
    default: Date.now
  }
});

var codeSchema = {
  code: code
};

module.exports = codeSchema;