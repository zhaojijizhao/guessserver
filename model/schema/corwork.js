var database = require('../database');

//商务合作信息
var corwork = new database.Schema({
  num: {
    type:String,
    validate:/.+/
  },
  title: {
    type:String,
    validate:/.+/
  },
  content: {
    type:String,
    validate:/.+/
  }
});

var corworkSchema = {
  corwork: corwork
};

module.exports = corworkSchema;