var database = require('../database');

//联系我们内容
var contact = new database.Schema({
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

var contactSchema = {
  contact: contact
};

module.exports = contactSchema;