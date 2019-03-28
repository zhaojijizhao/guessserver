var database = require('../database');

//奖励配置信息
var award = new database.Schema({
  name: {
    type:String,
    validate:/.+/
  },
  num: {
    type:String,
    validate:/.+/
  },
  type: {
    type: Number,
    validate:/.+/,
    default: 0
  },
  point: {
    type: Number,
    validate:/.+/,
    default: 0
  },
  coin: {
    type: Number,
    validate:/.+/,
    default: 0
  },
  bouns: {
    type: Number,
    validate:/.+/,
    default: 1
  },
  created_at:{
    type:Date,
    default: Date.now
  }
});

var awardSchema = {
  award: award
};

module.exports = awardSchema;